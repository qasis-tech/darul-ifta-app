import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import JoditEditor, { Jodit } from "jodit-react";

import {
  TextField,
  Button,
  Autocomplete,
  Paper,
  Container,
  Grid,
} from "@mui/material";

import { URLS } from "../../../config/urls.config";
import RouterList from "../../../routes/routerList";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";

import "./add.article.styles.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function AddArticle() {
  const navigate = useNavigate();

  const [mufthiData, setMufthiData] = useState([]);
  const [isLoader, setLoader] = useState([]);

  const [selectedMufthi, setSelectedMufthi] = useState([]);
  const [content, setContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

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
    getValues,
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
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
        setMufthiData([]);
      });
  };

  const handleSave = (params) => {
    setLoader(true);
    const { mufthi, language, title, status } = params;
    const payload = {
      mufthi,
      language,
      title,
      articleData: content,
      status,
    };

    console.log("Published", params);

    axios
      .post(`${URLS.article}`, payload)
      .then((res) => {
        if (res.success) {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
              navigate(
                `${RouterList?.admin.admin}/${RouterList.admin.article}`
              );
            },
          });
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

  console.log("content", content);

  return (
    <Container maxWidth="md">
      <Paper elevation={2} className="add-article-section">
        {isLoader ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="add-article-container ">
              <div className="add-article-row">
                <div className="col-md-6 first-col">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={mufthiData}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) => {
                      setSelectedMufthi(val);
                    }}
                    value={selectedMufthi}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Mufthi Name"
                        {...register("mufthi", {
                          required: "Mufthi Name is required",
                        })}
                      />
                    )}
                  />
                  {!selectedMufthi?.name && (
                    <div className="error">{errors?.mufthi?.message}</div>
                  )}
                </div>
                <div className="col-md-6 second-col">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={languageList}
                    getOptionLabel={(option) => option.title || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(e, val) => setSelectedLanguage(val)}
                    value={selectedLanguage}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Language"
                        {...register("language", {
                          required: "Language is required",
                        })}
                      />
                    )}
                  />

                  {!selectedLanguage?.title && (
                    <div className="error">{errors?.language?.message}</div>
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
              <div className="error">{errors?.title?.message}</div>

              {/* Editor */}

              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                // tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                // onChange={(newContent) => setContent(newContent)}
              />

              <div className="error">{errors?.articleFile?.message}</div>
              <Grid
                container
                spacing={3}
                sx={{ marginY: 2 }}
                justifyContent="end"
              >
                <Grid item xs={3}>
                  <Autocomplete
                    id="articleStatusList"
                    size="small"
                    fullWidth
                    options={status}
                    getOptionLabel={(option) => option.title || ""}
                    isOptionEqualToValue={(option, value) =>
                      option?.id === value?.id
                    }
                    value={selectedStatus}
                    onChange={(e, val) => setSelectedStatus(val)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        {...register("status", {
                          required: "Status is required",
                        })}
                      />
                    )}
                  />

                  {errors?.status && (
                    <div className="error">{errors?.status?.message}</div>
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
              </Grid>
            </div>
          </form>
        )}
      </Paper>
    </Container>
  );
}
