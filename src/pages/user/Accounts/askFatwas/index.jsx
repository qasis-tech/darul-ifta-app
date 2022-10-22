import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Autocomplete, Button } from "@mui/material";

import { URLS } from "../../../../config/urls.config";
import Loader from "../../../../components/common/Loader";
import SnackBar from "../../../../components/common/Snackbar";

import "./askfatwas.styles.scss";
import { PropaneSharp } from "@mui/icons-material";
import { connect } from "react-redux";
import { triggerApiCallStatus } from "../../../../redux/actions";

import getSubCategoryList from "../../../../services/getSubCategoryList";

const AskFatwasComponent = ({
  closePopup,
  triggerApiCallStatus,
  apiTriggeres,
  ...others
}) => {
  console.log("others ========================", others);
  const languageList = [
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ];

  const [categoryData, setCategoryData] = useState([]);
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userToken, setUserToken] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  useEffect(() => {
    getCatgoryApi();
    getmadhabApi();
    getSubCategoryList().then((res) => {
      let temp = res.map((el) => el.subCategory);
      setSubcategoryList(temp);
    });
  }, []);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("@darul-ifta-user-login-details")
    );
    console.log("user", user);
    if (user) {
      setUserId(user._id);
      setUserToken(user.initial_token);
    }
  }, []);

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      title: "",
    });
    closePopup(true);
  };

  const getCatgoryApi = () => {
    setLoader(true);
    axios
      .get(URLS.category)
      .then((res) => {
        setLoader(false);
        setCategoryData(res?.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const getmadhabApi = () => {
    setLoader(true);
    axios
      .get(URLS.madhab)
      .then((res) => {
        setLoader(false);
        setMadhabData(res?.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error madhab", err);
      });
  };

  const handleSubmitQuestion = ({ shortQuestion, question }) => {
    let category;
    for (let i = 0; i < categoryData.length; i++) {
      let subCat = categoryData[i]?.subCategory;
      if (subCat?.length) {
        for (let j = 0; j < subCat.length; j++) {
          if (selectedCategory?._id === subCat[j]?._id) {
            category = categoryData[i];
          }
        }
      }
    }

    setLoader(true);
    let payload = {
      user: userId,
      madhab: selectedMadhab._id,
      category: category?._id,
      sub_category: selectedCategory?._id,
      short_question: shortQuestion,
      question: question,
      language: selectedLanguage.title,
    };
    axios
      .post(`${URLS.question}`, payload, {
        headers: {
          Authorization: `${userToken}`,
        },
      })
      .then((res) => {
        setLoader(false);
        let temp = { ...apiTriggeres };
        temp.userGetQuesList = true;
        if (res?.success) {
          triggerApiCallStatus(temp);
          setSelectedCategory("");
          setSelectedMadhab("");
          setSelectedSubcategory("");
          setSelectedLanguage("");
          resetField("shortQuestion");
          resetField("question");
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
        console.log("Errors in ask fatwa", err);
      });
  };

  return (
    <div>
      {isLoading || errorPopup?.visible ? (
        <div className="mb-5">
          <Loader skeleton />
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleSubmitQuestion)}>
          <div className="form-section">
            <div className="form-container">
              <div className="row">
                <div className="col-md-4">
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
                          label="Madhab"
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
                <div className="col-md-4">
                  {subcategoryList?.length ? (
                    <Autocomplete
                      id="combo-box-demo"
                      size="small"
                      options={subcategoryList}
                      getOptionLabel={(option) => option.label || ""}
                      isOptionEqualToValue={(option, value) =>
                        option._id === value._id
                      }
                      onChange={(e, val) => setSelectedCategory(val)}
                      value={selectedCategory}
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
                  {!selectedCategory?.category && (
                    <div className="error">{errors?.category?.message}</div>
                  )}
                </div>
                {/* subcategory */}
                {/* <div className="col-md-3">
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
                          {...register("SubCategory")}
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
                          {...register("SubCategory")}
                        />
                      )}
                    />
                  )}
                </div> */}

                <div className="col-md-4">
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
                      maxLength: {
                        value: 80,
                        message: "Max 80 Characters",
                      },
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
                    {...register("question", {
                      required: "Question is required",
                    })}
                  />
                  <div className="error">{errors?.question?.message}</div>
                </div>
              </div>
              <div className="row">
                <div className="btn-section">
                  <Button
                    type="submit"
                    className="submit-btn"
                    variant="contained"
                  >
                    Submit Question
                  </Button>
                </div>
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
  );
};

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  triggerApiCallStatus: (payload) => dispatch(triggerApiCallStatus(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AskFatwasComponent);
