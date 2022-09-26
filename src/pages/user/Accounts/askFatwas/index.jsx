import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { URLS } from "../../../../config/urls.config";
import { TextField, Autocomplete, Button } from "@mui/material";

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
    axios
      .get(URLS.category, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res category11===>>", res.data.data);
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };

  const getmadhabApi = () => {
    axios
      .get(URLS.madhab, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res mathab===>>.", res.data.data);
        setMadhabData(res.data.data);
      })
      .catch((err) => {
        console.log("error madhab", err);
      });
  };

  const handleMadhab = (e, val) => {
    setSelectedMadhab(val);
  };

  const handleCategory = (e, val) => {
    setSelectedCategory(val);
  };

  const handleSubCategory = (e, val) => {
    setSelectedSubcategory(val);
  };

  const handleLanguage = (e, val) => {
    setSelectedLanguage(val);
  };

  // const token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZXRodTkwQGdtYWlsLmNvbSIsImlhdCI6MTY2NDE4NzMzOSwiZXhwIjoxNjkwMTA3MzM5fQ.992ybQeichJTrUDalc5xf3anv7VhFrhfWdWPCtP8KJo";

  const handleSubmitQuestion = ({ shortQuestion, question }) => {
    let payload = {
      user_id: userId,
      madhab: selectedMadhab._id,
      category: selectedCategory._id,
      subCategory: selectedSubcategory._id,
      short_question: shortQuestion,
      question: question,
      language: selectedLanguage.title,
    };
    console.log("payload", payload);
    axios
      .post(`${URLS.question}`, payload, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res ask fatwa ===>>", res);
      })
      .catch((err) => {
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
                  onChange={(e, val) => handleMadhab(e, val)}
                  value={selectedMadhab}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                    Madhab"
                      {...register("madhab", { required: "This is required" })}
                    />
                  )}
                />
              ) : null}

              <div className="error">{errors?.madhab?.message}</div>
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
                  onChange={(e, val) => handleCategory(e, val)}
                  value={selectedCategory}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                Category"
                      {...register("category", {
                        required: "This is required",
                      })}
                    />
                  )}
                />
              ) : null}

              <div className="error">{errors?.category?.message}</div>
            </div>

            {/* subcategory */}
            <div className="col-md-3">
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
                onChange={(e, val) => handleSubCategory(e, val)}
                value={selectedSubcategory}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subcategory"
                    size="small"
                    {...register("SubCategory", {
                      required: "This is required",
                    })}
                  />
                )}
              />
            </div>

            <div className="col-md-3">
              {languageList?.length && (
                <Autocomplete
                  id="combo-box-demo"
                  size="small"
                  options={languageList}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, val) => handleLanguage(e, val)}
                  value={selectedLanguage}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
              Language"
                      {...register("language", {
                        required: "This is required",
                      })}
                    />
                  )}
                />
              )}
              <div className="error">{errors?.language?.message}</div>
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
                {...register("shortQuestion", { required: "This is required" })}
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
                {...register("question", { required: "This is required" })}
              />
              <div className="error">{errors?.question?.message}</div>
            </div>
          </div>
          <div className="row">
            <div className=" btn-section">
              <Button type="submit" className="submit-btn" variant="contained">
                Submit Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
