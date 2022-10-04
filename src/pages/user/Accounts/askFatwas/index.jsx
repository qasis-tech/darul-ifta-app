import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Autocomplete, Button } from "@mui/material";

import { URLS } from "../../../../config/urls.config";
import Loader from "../../../../components/common/Loader";

import "./askfatwas.styles.scss";

export default function AskFatwasComponent() {
  const [languageList, setLanguageList] = useState([
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ]);
  const [categoryData, setCategoryData] = useState([]);
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userToken, setUserToken] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCatgoryApi();
    getmadhabApi();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("@darul-ifta-login-details"));
    console.log("user", user);
    if (user) {
      setUserId(user._id);
      setUserToken(user.initial_token);
    }
  }, []);

  const getCatgoryApi = () => {
    setLoader(true);
    axios
      .get(URLS.category, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const getmadhabApi = () => {
    setLoader(true);
    axios
      .get(URLS.madhab, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        setMadhabData(res.data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error madhab", err);
      });
  };

  const handleSubmitQuestion = ({ shortQuestion, question }) => {
    setLoader(true);
    let payload = {
      user: userId,
      madhab: selectedMadhab._id,
      category: selectedCategory._id,
      sub_category: selectedSubcategory._id,
      short_question: shortQuestion,
      question: question,
      language: selectedLanguage.title,
    };
    axios
      .post(`${URLS.question}`, payload, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("res ask fatwa ===>>", res);
      })
      .catch((err) => {
        setLoader(false);
        console.log("Errors in ask fatwa", err);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitQuestion)}>
      <div className="form-section">
        <div className="form-container">
          <div className="row">
            <div className="col-md-3">
              {madhabData?.length ? (
                <Autocomplete
                  id="outlined-basic"
                  size="small"
                  options={madhabData}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, val) => setSelectedMadhab(val)}
                  value={selectedMadhab}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                    Madhab"
                      {...register("madhab", {
                        required: "Madhab is required",
                      })}
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  size="small"
                  id="combo-box-demo"
                  options={[]}
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
              {!selectedMadhab?.title ? (
                <div className="error">{errors?.madhab?.message}</div>
              ) : null}
            </div>
            <div className="col-md-3">
              {categoryData?.length ? (
                <Autocomplete
                  id="combo-box-demo"
                  size="small"
                  options={categoryData}
                  getOptionLabel={(option) => option.category || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, val) => setSelectedCategory(val)}
                  value={selectedCategory}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                Category"
                      {...register("category", {
                        required: "Category is required",
                      })}
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  size="small"
                  id="combo-box-demo"
                  options={[]}
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
              {!selectedCategory.category && (
                <div className="error">{errors?.category?.message}</div>
              )}
            </div>

            {/* subcategory */}
            <div className="col-md-3">
              {selectedCategory?.subCategory?.length ? (
                <Autocomplete
                  options={
                    selectedCategory?.subCategory?.length
                      ? selectedCategory?.subCategory
                      : []
                  }
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                  }
                  onChange={(e, val) => setSelectedSubcategory(val)}
                  value={selectedSubcategory}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subcategory"
                      size="small"
                      {...register("SubCategory", {
                        required: "SubCategory is required",
                      })}
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  size="small"
                  id="combo-box-demo"
                  options={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subcategory"
                      {...register("SubCategory", {
                        required: "SubCategory is required",
                      })}
                    />
                  )}
                />
              )}
              {!selectedSubcategory.label && (
                <div className="error">{errors?.SubCategory?.message}</div>
              )}
            </div>

            <div className="col-md-3">
              {languageList?.length && (
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
                      label="
              Language"
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
          <div className="row">
            <div className="col-md-12">
              <TextField
                id="outlined-basic"
                size="small"
                fullWidth
                label="Short Question"
                variant="outlined"
                {...register("shortQuestion", {
                  required: "ShortQuestion is required",
                })}
              />
              <div className="error">{errors?.shortQuestion?.message}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TextField
                id="outlined-multiline-static"
                label="Question "
                multiline
                fullWidth
                rows={4}
                {...register("question", { required: "Question is required" })}
              />
              <div className="error">{errors?.question?.message}</div>
            </div>
          </div>
          <div className="row">
            <div className="btn-section">
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  className="submit-btn"
                  variant="contained"
                >
                  Submit Question
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
