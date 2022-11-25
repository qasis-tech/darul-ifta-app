import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  TextField,
  Button,
  Autocomplete,
  Paper,
  Container,
} from "@mui/material";

import { URLS } from "../../../config/urls.config";
import RouterList from "../../../routes/routerList";

import "./add.article.styles.scss";
import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";
import TextEditor from "../../../components/RichTextEditor";

export default function ArticleDetails() {
  const navigate = useNavigate();

  const [mufthiData, setMufthiData] = useState([]);
  const [isLoader, setLoader] = useState([]);
  const [selectedMufthi, setSelectedMufthi] = useState([]);
  const [articleDetails, setArticleDetails] = useState(null);
  const [content, setContent] = useState("");
  const languageList = [
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });
  const { id } = useParams();
  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    setValue,
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
        console.log("res", res);
        setArticleDetails(res.data);
        setValue("title", res?.data?.title);
        setContent(res?.data?.articleData);

        let index = list.findIndex((fl) => fl.name === res?.data?.mufthi);
        if (index !== -1) {
          setSelectedMufthi(list[index]);
        }

        let index1 = languageList.findIndex(
          (fl) => fl.title === res?.data?.language
        );
        if (index1 !== -1) {
          setSelectedLanguage(languageList[index1]);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("Error in Article Details", err);
      });
  };

  const postArticleUpdate = (params) => {
    setLoader(true);
    const { mufthi, language, title } = params;
    const payload = {
      mufthi: mufthi,
      language: language,
      title: title,
      articleData: content,
    };

    axios
      .post(`${URLS.article}`, payload)
      .then((res) => {
        setLoader(false);
        if (res.success) {
          setError({
            visible: true,
            message: res.message,
            type: "success",
            title: "Success",
          });
        } else {
          setError({
            visible: true,
            message: res.message,
            type: "warning",
            title: "Warning",
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("Error in Article Add", err);
      });
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
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      size="small"
                      options={mufthiData}
                      getOptionLabel={(option) => option.name || ""}
                      isOptionEqualToValue={(option, value) =>
                        option?._id === value?._id
                      }
                      onChange={(e, val) => {
                        setSelectedMufthi(val);
                      }}
                      value={selectedMufthi}
                      renderInput={(params) => (
                        <TextField {...params} label="Mufthi Name" />
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
                        <TextField {...params} label="Language" />
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
                <TextEditor content={content} setContent={setContent} />

                <div className="btn-section">
                  <div className="col-md-1">
                    <Button
                      variant="contained"
                      className="form-btn"
                      type="submit"
                      fullWidth
                    >
                      SAVE
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          {errorPopup.visible && (
            <SnackBar
              visible={errorPopup.visible}
              message={errorPopup.message}
              type={errorPopup.type}
              title={errorPopup.title}
              onClose={() => handleCloseError()}
            />
          )}
        </div>
      </Paper>
    </Container>
  );
}
