import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  TextField,
  Button,
  Autocomplete,
  Paper,
  Container,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";

import VisibilityIcon from "@mui/icons-material/Visibility";

import Loader from "../../../components/common/Loader";
import TextEditor from "../../../components/RichTextEditor";
import { URLS } from "../../../config/urls.config";
import RouterList from "../../../routes/routerList";

import "./add.article.styles.scss";
import JoditEditor from "jodit-react";

export default function ArticleDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mufthiData, setMufthiData] = useState([]);
  const [isLoader, setLoader] = useState([]);
  const [articleDetails, setArticleDetails] = useState(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const languageList = [
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ];

  const status = [
    { id: 1, title: "Published" },
    { id: 2, title: "Drafted" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMufthiApi();
  }, []);

  const getMufthiApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}?userType=Mufthi`)
      .then(({ data }) => {
        setLoader(false);
        setMufthiData(data);
        getArticleDetailsApi(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
        setMufthiData([]);
      });
  };

  const getArticleDetailsApi = (list) => {
    setLoader(true);
    axios
      .get(`${URLS.article}/${id}`)
      .then((res) => {
        setLoader(false);
        setArticleDetails(res.data);
        setValue("title", res?.data?.title);
        setContent(res?.data?.articleData);

        let index = list.findIndex((fl) => fl.name === res?.data?.mufthi);
        if (index !== -1) {
          setValue("mufthi", list[index]);
        }

        let index1 = languageList.findIndex(
          (fl) => fl.title === res?.data?.language
        );
        if (index1 !== -1) {
          setValue("language", languageList[index1]);
        }

        let index2 = status.findIndex((fl) => fl.title === res?.data?.status);
        if (index2 !== -1) {
          setValue("status", status[index2]);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("Error in Article Details", err);
      });
  };

  const postArticleUpdate = (params) => {
    setLoader(true);
    const { mufthi, language, title, status } = params;
    const payload = {
      mufthi: mufthi?.name,
      language: language?.title,
      title: title,
      articleData: content,
      status: status?.title,
    };

    axios
      .post(`${URLS.article}`, payload)
      .then((res) => {
        setLoader(false);
        if (res.success) {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
            },
          });
          navigate(-1);
        } else {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
            },
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        toast(err.message, {
          onClose: () => {
            setLoader(false);
          },
        });
        console.log("Error in Article Add", err);
      });
  };

  const editor = useRef(null);
  const config = {
    autofocus: true,
    removeButtons: [
      "copyformat",
      "brush",
      "table",
      "eraser",
      "font",
      "selectall",
      "fontsize",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: "Start typings...",
    minHeight: 450,
  };

  return (
    <Container>
      <Paper elevation={2}>
        <div className="add-article-section">
          {isLoader ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit(postArticleUpdate)}>
              <div className="add-article-container">
                <div className="add-article-row">
                  <div className="col-md-6 first-col">
                    <Controller
                      control={control}
                      name="mufthi"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          disablePortal
                          id="mufthiList"
                          size="small"
                          options={mufthiData}
                          getOptionLabel={(option) => option.name || ""}
                          isOptionEqualToValue={(option, value) =>
                            option?._id === value?._id
                          }
                          value={value}
                          onChange={(e, val) => onChange(val)}
                          renderInput={(params) => (
                            <TextField {...params} label="Mufthi Name" />
                          )}
                        />
                      )}
                    />
                    {errors?.mufthi && (
                      <div className="error py-1">Mufthi is required</div>
                    )}
                  </div>

                  <div className="col-md-6 second-col">
                    <Controller
                      control={control}
                      name="language"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          id="language"
                          size="small"
                          options={languageList}
                          getOptionLabel={(option) => option.title || ""}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          value={value}
                          onChange={(e, val) => onChange(val)}
                          renderInput={(params) => (
                            <TextField {...params} label="Language" />
                          )}
                        />
                      )}
                    />
                    {errors?.language && (
                      <div className="error py-1">Language is required</div>
                    )}
                  </div>
                </div>
                <div className="add-article-row">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Title"
                    multiline
                    fullWidth
                    rows={2}
                    {...register("title", { required: "Title is required" })}
                  />
                </div>
                <div className="error py-2">{errors?.title?.message}</div>

                {/* Editor */}
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  // tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  // onChange={(newContent) => setContent(newContent)}
                />

                <Grid
                  container
                  spacing={3}
                  sx={{ marginY: 2 }}
                  justifyContent="end"
                >
                  <Grid item xs={3}>
                    <Controller
                      control={control}
                      name="status"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          id="articleStatusList"
                          size="small"
                          fullWidth
                          options={status}
                          getOptionLabel={(option) => option.title || ""}
                          isOptionEqualToValue={(option, value) =>
                            option?.id === value?.id
                          }
                          value={value}
                          onChange={(e, val) => onChange(val)}
                          renderInput={(params) => (
                            <TextField {...params} label="Status" />
                          )}
                        />
                      )}
                    />

                    {errors?.status && (
                      <div className="error py-1">Status ir required</div>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      className="form-btn"
                      type="submit"
                      fullWidth
                    >
                      SAVE
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined">
                      <VisibilityIcon
                        className="text-secondary"
                        onClick={() => setPreview(!preview)}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          )}
        </div>
      </Paper>
      {preview && (
        <Paper elevation={1} sx={{ marginY: 2, p: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Paper>
      )}
    </Container>
  );
}
