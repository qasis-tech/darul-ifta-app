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
} from "@mui/material";

import { URLS } from "../../../config/urls.config";
import RouterList from "../../../routes/routerList";

import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";

import "./add.article.styles.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextEditor from "../../../components/RichTextEditor";

export default function AddArticle() {
  const [mufthiData, setMufthiData] = useState([]);
  const [isLoader, setLoader] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState();
  const [selectedMufthi, setSelectedMufthi] = useState([]);
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

  console.log("content ===> 2222222222222222222 ", content);

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
              <TextEditor content={content} setContent={setContent} />
              {/* <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => setContent(newContent)}
              /> */}

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
