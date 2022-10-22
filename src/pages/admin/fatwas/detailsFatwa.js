import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Button, TextField, Autocomplete, Chip } from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import FatwaAddComponent from "../../../components/FatwaAddComponent";
import getCategoryListApi from "../../../services/getCategoryList";
import getmadhabList from "../../../services/getMadhabList";
import { URLS } from "../../../config/urls.config";

import "./fatwas.details.styles.scss";
import Loader from "../../../components/common/Loader";
import DialogComponent from "../../../components/DialogComponent";
import RejectedReasonSection from "./components/RejectedReasonSection";

export default function FatwasDetails() {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
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
  const [closePopup, setClosePopup] = useState(false);
  const [subCategoryData, setSubCategory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { state } = useLocation();
  console.log("state ===>", state);

  const stateSubcategory = state?.sub_category?.map((subC) => {
    return subC?.label;
  });

  useEffect(() => {
    getCategory();
    getSubcategory();
    getMadhab();
    getMufthiApi();
    setSelectedCategory(state?.category[0]);
    setSelectedSubCategory(state?.sub_category);
    setSelectedMadhab(state?.madhab);
    setSelectedLanguage({ id: "", title: state?.language });
    setShortQuestion(state?.short_question);
    setLongQuestion(state?.question);
    setSelectedMufthi(state?.mufti || "N/A");
    setSelectedMufthiVerified(state?.verified_by || "N/A");
    setAnswer(state?.answer || "N/A");
  }, []);

  const handleChangeShort_Question = (event) =>
    setShortQuestion(event.target.value);

  const handleChangeLongQuestion = (event) =>
    setLongQuestion(event.target.value);

  const handleChangeAnswer = (event) => setAnswer(event.target.value);

  const getCategory = () => {
    setLoader(true);
    getCategoryListApi()
      .then((res) => {
        setCategoryData(res);
        console.log("categorryyyy", res);
        setLoader(false);
      })
      .catch((err) => {
        console.log("Errr in get Category API", err);
        setCategoryData([]);
        setLoader(false);
      });
  };

  const getSubcategory = () => {
    setLoader(true);
    axios
      .get(`${URLS.subcategory}`)
      .then((res) => {
        setLoader(false);
        console.log("res subcategory", res?.data);
        const temp = res?.data?.map((subcat) => {
          return subcat.subCategory;
        });
        setSubCategory(temp);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
      });
  };

  const getMadhab = () => {
    setLoader(true);
    getmadhabList()
      .then((res) => {
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

  const mufthiVerified = mufthiData.filter(
    (obj) => obj?._id !== selectedMufthi?._id
  );

  const handleAccept = () => {
    setLoader(true);
    let payload = {
      madhab: state?.madhab,
      category: state?.category,
      sub_category: state?.sub_category,
      short_question: state?.short_question,
      question: state?.question,
      language: state?.language,
      status: "Received to Darul Ifta",
      answer: state?.answer,
      reference: state?.reference,
      answered_date: state?.answered_date,
      verified_date: state?.verified_date,
      answered_by: state?.answered_by,
      verified_by: state?.verified_by,
      mufti: state?.mufti,
      verifier: state?.verifier,
      reject_by: state?.reject_by,
      mufti_answered: state?.mufti_answered,
      reject_reason: state?.reject_reason,
    };
    axios
      .put(`${URLS.question}/${state._id}`, payload, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("res put accept api", res);
        if (res?.success) {
          navigate(-1);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error in profile edit", err);
      });
  };

  const handlePdf = () => {
    setLoader(true);
    axios
      .get(`${URLS.pdf}/${state._id}`)
      .then((res) => {
        setLoader(false);
        // console.log("res pdf api", res);
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error in pdf ", err);
      });
  };

  const handlePublish = () => {};

  const navigate = useNavigate();

  return (
    <div className="fatwas-details-section">
      <div className="fatwa-print-section">
        <div className="col-md-6">
          <h6>
            <span className="id-style">QID : {state?.slNo}</span>
            <span>
              : - {state?.category[0]?.category}({stateSubcategory}) -{" "}
              <span>{state?.status}</span>
            </span>
          </h6>
        </div>
        <div className="col-md-6 printer">
          <Button variant="contained" className="form-btn" onClick={handlePdf}>
            <PrintIcon />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(handlePublish)}>
          <div className="fatwas-details-container">
            <div className="fatwas-details-row">
              <div className="col-md-4 first-col">
                {categoryData?.length && (
                  <Autocomplete
                    size="small"
                    fullWidth
                    value={selectedCategory}
                    onChange={(event, newValue) => {
                      console.log("newValue", newValue);
                      setSelectedCategory(newValue);
                    }}
                    id="controllable-states-demo"
                    options={categoryData || null}
                    getOptionLabel={(option) => option?.category}
                    isOptionEqualToValue={(option, value) =>
                      option?._id === value?._id
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
                {subCategoryData?.length && (
                  <Autocomplete
                    id="controllable-states-demo"
                    size="small"
                    fullWidth
                    multiple
                    options={subCategoryData || null}
                    getOptionLabel={(option) => option?.label}
                    isOptionEqualToValue={(option, value) =>
                      option?._id === value?._id
                    }
                    onChange={(event, newValue) => {
                      console.log("newvalue", newValue);
                      setSelectedSubCategory(newValue);
                    }}
                    value={selectedSubCategory || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Subcategory" />
                    )}
                  />
                )}
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
                    getOptionLabel={(option) => option?.title}
                    isOptionEqualToValue={(option, value) =>
                      option?._id === value?._id
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
                    getOptionLabel={(option) => option?.title}
                    isOptionEqualToValue={(option, value) =>
                      option?.id === value?.id
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
                    <div className="error">
                      {errors?.shortQuestion?.message}
                    </div>
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
            {state?.status !== "Pending" ? (
              <>
                <div className="fatwas-details-row written-section">
                  <div className="col-md-3 first-col">
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
                  <div className="col-md-3">
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
                          option?._id === value?._id
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Verified By" />
                        )}
                      />
                    )}
                  </div>
                  <div className="col-md-3">
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
                        <TextField {...params} label="Assigned To" />
                      )}
                    />
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
              </>
            ) : (
              <>
                <div className="fatwabutton">
                  <div className="accept-section">
                    <Button
                      type="submit"
                      variant="contained"
                      className="form-btn accept-btn"
                      onClick={handleAccept}
                    >
                      Accept
                    </Button>
                  </div>

                  {/* <Button
                    type="submit"
                    variant="contained"
                    className="form-btn rejected"
                  >
                    Reject
                  </Button> */}
                  <DialogComponent
                    title="Reasons for Rejection"
                    className="model-section"
                    // msg="Please select any reason"
                    mainComponent={<RejectedReasonSection state={state} />}
                    fullWidth
                    size="xl"
                    close={closePopup}
                  >
                    <Button
                      variant="contained"
                      className="form-btn rejected"
                      fullWidth
                      onClick={() => setClosePopup(false)}
                    >
                      Reject
                    </Button>
                  </DialogComponent>
                </div>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
