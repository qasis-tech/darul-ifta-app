import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import FatwaAddComponent from "../../../components/FatwaAddComponent";
import getQuestionListApi from "../../../services/getQuestionsList";
import "./fatwas.details.styles.scss";
import { useParams, useLocation } from "react-router-dom";
import getCategoryListApi from "../../../services/getCategoryList";
import getmadhabList from "../../../services/getMadhabList";
import { URLS } from "../../../config/urls.config";

const options = ["Option 1", "Option 2"];

export default function FatwasDetails() {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState("");
  const languageList = [
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [shortQuestion, setShortQuestion] = useState("");
  const [longQuestion, setLongQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mufthiData, setMufthiData] = useState([]);
  const [selectedMufthi, setSelectedMufthi] = useState([]);
  const [selectedMufthiVerified, setSelectedMufthiVerified] = useState([]);
  const [isLoading, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const { state } = useLocation();

  useEffect(() => {
    getCategory();
    getMadhab();
    getMufthiApi();
    setSelectedCategory(state.category);
    setSelectedSubCategory({ label: state.sub_category, active: true, id: "" });
    setSelectedMadhab(state.madhab);
    setSelectedLanguage({ id: "", title: state.language });
    setShortQuestion(state?.short_question);
    setLongQuestion(state?.question);
    setSelectedMufthi(state?.mufti || "N/A");
    setSelectedMufthiVerified(state?.verified_by || "N/A");
    setAnswer(state?.answer || "N/A");
  }, []);

  const handleChangeShort_Question = (event) => {
    setShortQuestion(event.target.value);
  };

  const handleChangeLongQuestion = (event) => {
    setLongQuestion(event.target.value);
  };

  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const getCategory = () => {
    setLoader(true);
    getCategoryListApi()
      .then((res) => {
        console.log("res Category ", res);
        setCategoryData(res);
        setLoader(false);
      })
      .catch((err) => {
        console.log("Errr in get Category API", err);
        setCategoryData([]);
        setLoader(false);
      });
  };

  const getMadhab = () => {
    setLoader(true);
    getmadhabList()
      .then((res) => {
        console.log("res madhab1111111 ", res);
        setMadhabData(res);
        setLoader(false);
      })
      .catch((err) => {
        console.log("Errr in get madhab API", err);
        setMadhabData([]);
        setLoader(false);
      });
  };

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
        console.log("res mufthi", data);
        setMufthiData(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
        setMufthiData([]);
      });
  };

  const mufthiVerified = mufthiData.filter((obj) => {
    return obj?._id !== selectedMufthi?._id;
  });

  const handlePublish = () => {};

  return (
    <div className="fatwas-details-section">
      <div className="fatwa-print-section">
        <div className="col-md-6">
          <h6>
            <span className="id-style"> Q-ID</span>
            <span>
              &nbsp;: 553 - KAUZARIYYA : <span>Published</span>
            </span>
          </h6>
        </div>
        <div className="col-md-6 printer">
          <Button variant="contained" className="form-btn">
            <PrintIcon />
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(handlePublish)}>
        <div className="fatwas-details-container">
          <div className="fatwas-details-row">
            <div className="col-md-4 first-col">
              {categoryData?.length && (
                <Autocomplete
                  size="small"
                  value={selectedCategory}
                  fullWidth
                  onChange={(event, newValue) => {
                    setSelectedCategory(newValue);
                  }}
                  id="controllable-states-demo"
                  options={categoryData}
                  getOptionLabel={(option) => option?.category || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      {...register("category", {
                        required: "Category is required",
                      })}
                    />
                  )}
                />
              )}
              {!selectedCategory?.category && (
                <div className="error">{errors?.category?.message}</div>
              )}
            </div>

            <div className="col-md-4 first-col">
              <Autocomplete
                id="controllable-states-demo"
                size="small"
                fullWidth
                options={
                  selectedCategory?.subCategory?.length
                    ? selectedCategory?.subCategory
                    : []
                }
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newValue) => {
                  setSelectedSubCategory(newValue);
                }}
                value={selectedSubCategory}
                renderInput={(params) => (
                  <TextField {...params} label="Subcategory" />
                )}
              />
            </div>
            <div className="col-md-2">
              {madhabData?.length && (
                <Autocomplete
                  error
                  size="small"
                  value={selectedMadhab}
                  fullWidth
                  onChange={(event, newValue) => {
                    setSelectedMadhab(newValue);
                  }}
                  id="controllable-states-demo"
                  options={madhabData}
                  getOptionLabel={(option) => option?.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Madhab"
                      {...register("madhab", {
                        required: "Madhab is required",
                      })}
                    />
                  )}
                />
              )}
              {!selectedMadhab?.title && (
                <div className="error">{errors?.madhab?.message}</div>
              )}
            </div>
            <div className="col-md-2 second-col">
              {languageList?.length && (
                <Autocomplete
                  size="small"
                  error
                  value={selectedLanguage}
                  fullWidth
                  onChange={(event, newValue) => {
                    setSelectedLanguage(newValue);
                  }}
                  id="controllable-states-demo"
                  options={languageList}
                  getOptionLabel={(option) => option?.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
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
              )}
              {!selectedLanguage?.title && (
                <div className="error">{errors?.language?.message}</div>
              )}
            </div>
          </div>
          <div className="qshort-section">
            <div className="qshort-container">
              <div className="qshort-row">
                <div className="col-md-12">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Short Question"
                    multiline
                    fullWidth
                    maxRows={4}
                    value={shortQuestion}
                    onChange={handleChangeShort_Question}
                    // {...register("shortQuestion", {
                    //   required: "ShortQuestion is required",
                    // })}
                  />
                  <div className="error">{errors?.shortQuestion?.message}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="qshort-section">
            <div className="qshort-container">
              <div className="qshort-row">
                <div className="col-md-12">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Long Question"
                    multiline
                    fullWidth
                    rows={4}
                    value={longQuestion}
                    onChange={handleChangeLongQuestion}
                    // {...register("longQuestion", {
                    //   required: "LongQuestion is required",
                    // })}
                  />
                  <div className="error">{errors?.longQuestion?.message}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="fatwas-details-row written-section">
            <div className="col-md-6 first-col">
              {mufthiData?.length && (
                <Autocomplete
                  size="small"
                  value={selectedMufthi || ""}
                  fullWidth
                  onChange={(event, newValue) => {
                    setSelectedMufthi(newValue);
                  }}
                  id="controllable-states-demo"
                  options={mufthiData || ""}
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Written By" />
                  )}
                />
              )}
            </div>
            <div className="col-md-6">
              {mufthiData?.length && (
                <Autocomplete
                  size="small"
                  value={selectedMufthiVerified || ""}
                  fullWidth
                  onChange={(event, newValue) => {
                    setSelectedMufthiVerified(newValue);
                  }}
                  id="controllable-states-demo"
                  options={mufthiVerified || ""}
                  getOptionLabel={(option) => option?.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Verified By" />
                  )}
                />
              )}
            </div>
          </div>
          <div className="qshort-section">
            <div className="qshort-container">
              <div className="qshort-row">
                <div className="col-md-12">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Answer"
                    multiline
                    fullWidth
                    rows={6}
                    value={answer}
                    onChange={handleChangeAnswer}
                  />
                </div>
              </div>
            </div>
          </div>
          <FatwaAddComponent />
          <div className="btn-section">
            <div className="col-md-1">
              <Button
                type="submit"
                variant="contained"
                className="form-btn"
                fullWidth
              >
                PUBLISH
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
