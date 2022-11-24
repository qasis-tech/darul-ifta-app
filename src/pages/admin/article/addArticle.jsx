import React, { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

export default function AddArticle() {
  const [mufthiData, setMufthiData] = useState([]);
  const [isLoader, setLoader] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState();
  const [selectedMufthi, setSelectedMufthi] = useState([]);
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

  const getFileName = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
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
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMufthiApi();
  }, []);

  const getMufthiApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}?userType=Mufthi`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
    const { mufthi, language, title, articleFile } = params;

    const formData = new FormData();
    formData.append("mufthi", mufthi);
    formData.append("language", language);
    formData.append("title", title);
    formData.append("articleFile", articleFile[0]);

    axios
      .post(`${URLS.article}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("res article", res);
        if (res.success) {
          setError({
            visible: true,
            message: res.message,
            type: "success",
            title: "Success",
          });
          // navigate(`${RouterList.admin.admin}/${RouterList.admin.article}`);
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
  const navigate = useNavigate();

  const changeHandler = (e) => {
    if (e.target.files.length > 0) {
      let filename = e.target.files[0].name;
      console.log(filename);
    }
  };

  return (
    <Container>
      <Paper className="add-article-section">
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
              <div className="add-article-row">
                <Button
                  variant="contained"
                  className="file-btn"
                  fullWidth
                  component="label"
                >
                  Upload File
                  <input
                    {...register("articleFile", { required: "Upload File" })}
                    type="file"
                    hidden
                    onChange={getFileName}
                  />
                </Button>
              </div>
              <div>{filename}</div>
              <div className="error">{errors?.articleFile?.message}</div>
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
      </Paper>
    </Container>
  );
}
