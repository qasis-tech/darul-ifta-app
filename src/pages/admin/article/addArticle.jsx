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
import { toast } from "react-toastify";
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
      status: "Published",
    };

    axios
      .post(`${URLS.article}`, payload)
      .then((res) => {
        if (res.success) {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
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
        toast("Somthing went wrong, please try again later", {
          onClose: () => {
            setLoader(false);
          },
        });
        console.log("Error in Article Add", err);
      });
  };
  const handleDraft = (params) => {
    setLoader(true);
    const { mufthi, language, title } = params;
    const payload = {
      mufthi: mufthi,
      language: language,
      title: title,
      articleData: content,
      status: "Drafted",
      // "Published"
    };

    axios
      .post(`${URLS.article}`, payload)
      .then((res) => {
        if (res.success) {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
            },
          });
          navigate(-1)
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
        toast("Somthing went wrong, please try again later", {
          onClose: () => {
            setLoader(false);
          },
        });
        console.log("Error in Article Add", err);
      });
  };
  const navigate = useNavigate();

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

              <div>{filename}</div>
              <div className="error">{errors?.articleFile?.message}</div>
              <div className="btn-section">
                <div className="col-md-1">
                  <Button
                    variant="contained"
                    className="form-btn"
                    type="submit"
                    fullWidth
                    onClick={() => handleSubmit()}
                  >
                    DRAFT
                  </Button>
                  <Button
                    variant="contained"
                    className="form-btn"
                    type="submit"
                    fullWidth
                    {...register("submitType")}
                  >
                    SAVE
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Paper>
    </Container>
  );
}
