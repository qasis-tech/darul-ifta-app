import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TextField, Autocomplete, Button, Grid } from "@mui/material";
import { PropaneSharp } from "@mui/icons-material";

import { URLS } from "../../../../config/urls.config";
import Loader from "../../../../components/common/Loader";
import SnackBar from "../../../../components/common/Snackbar";

import "./askfatwas.styles.scss";

import { triggerApiCallStatus } from "../../../../redux/actions";
import getSubCategoryList from "../../../../services/getSubCategoryList";
import { authLogout } from "../../../../routes/auth";
import routerList from "../../../../routes/routerList";
import { toast } from "react-toastify";

const AskFatwasComponent = ({ close, triggerApiCallStatus, apiTriggeres, setIsAskedFatwa }) => {
  const navigate = useNavigate();

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
    if (user) {
      setUserId(user._id);
      setUserToken(user.initial_token);
    }
  }, []);

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
        // toast("Somthing went wrong, please try again later", {
        //   onClose: () => {
        //     setLoader(false);
        //   },
        // });
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

          setTimeout(() => {
            toast(res.message, {
              onClose: () => {
                setLoader(false);
                close();
                setIsAskedFatwa(true)
              },
            });
          }, 500);
        } else {
          toast(res.message);
          setLoader(false);
          if (res?.message === "User not exists..!") {
            authLogout(() => {
              navigate(`${routerList.user.home}`);
            });
          }
        }
      })
      .catch((err) => {
        setLoader(false);
        toast("Somthing went wrong, please try again later", {
          onClose: () => {
            setLoader(false);
          },
        });
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
              <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid item md={4}>
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
                </Grid>
                <Grid item md={4}>
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

                  {!selectedMadhab?.title ? (
                    <div className="error">{errors?.madhab?.message}</div>
                  ) : null}
                </Grid>
                <Grid item md={4}>
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
                  {!selectedCategory?.label && (
                    <div className="error">{errors?.category?.message}</div>
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12}>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    fullWidth
                    multiline
                    rows={2}
                    maxRows={2}
                    label="Short Question"
                    variant="outlined"
                    {...register("shortQuestion", {
                      required: "Short Question is required",
                      maxLength: {
                        value: 120,
                        message: "Max 120 Characters",
                      },
                    })}
                  />
                  <div className="error">{errors?.shortQuestion?.message}</div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12}>
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
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Button
                  type="submit"
                  className="submit-btn"
                  variant="contained"
                >
                  Submit Question
                </Button>
              </Grid>
            </div>
          </div>
        </form>
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
