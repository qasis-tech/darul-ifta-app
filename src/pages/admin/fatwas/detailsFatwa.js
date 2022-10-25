import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
import moment from "moment";
import getQuestionListApi from "../../../services/getQuestionsList";

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
  const [state, setQuestionDetails] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();

  useEffect(() => {
    getCategory();
    getSubcategory();
    getMadhab();
    getMufthiApi();
    if (id) {
      getQuestionListApi(`/${id}`)
        .then((res) => {
          setQuestionDetails(res.data);
          setSelectedCategory(res.data?.category[0]);
          setSelectedSubCategory(res.data?.sub_category);
          setSelectedMadhab(res.data?.madhab);
          setSelectedLanguage({ id: "", title: res.data?.language });
          setShortQuestion(res.data?.short_question);
          setLongQuestion(res.data?.question);
          setSelectedMufthi(res.data?.mufti || "N/A");
          setSelectedMufthiVerified(res.data?.verified_by || "N/A");
          setAnswer(res.data?.answer || "N/A");
        })
        .catch((err) => {
          console.error(
            "Error in getQuestionListApi in admin/Fatwa details",
            err
          );
        });
    }
  }, []);

  const handleChangeShort_Question = (e) => setShortQuestion(e.target.value);
  const handleChangeLongQuestion = (e) => setLongQuestion(e.target.value);
  const handleChangeAnswer = (e) => setAnswer(e.target.value);

  const getCategory = () => {
    setLoader(true);
    getCategoryListApi()
      .then((res) => {
        setCategoryData(res);
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
      sub_category: selectedSubCategory,
      short_question: shortQuestion,
      question: longQuestion,
      language: selectedLanguage?.title,
      status: "Received to Darul Ifta",
      answer: null,
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
      .get(`${URLS.pdf}/${state._id}`, {
        responseType: "arraybuffer",
      })
      .then(async (res) => {
        setLoader(false);
        const blob = new Blob([res], {
          type: "application/pdf",
        });
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `QID-${state?.slNo}-${state?.user?.name}-${state?.status}.pdf`;
        alink.click();
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error in pdf ", err);
      });
  };

  const handlePublish = () => {};

  const navigate = useNavigate();

  console.log("state =====>", state);
  return (
    <div className="fatwas-details-section">
      <div className="fatwa-print-section">
        <div className="col-md-7 mt-auto">
          <h6>
            <span className="id-style">QID : </span>
            <span> {state?.slNo} </span>
            <span>
              / <span className="id-style"> mustafthi : </span>
              <span>{state?.user?.name}</span>
            </span>{" "}
            / <span className="id-style">Submitted : </span>
            <span>{moment(state?.createdAt).format("DD-MMM-YYYY")}</span>
            {state?.status !== "Pending" && (
              <>
                <span className="id-style">/ Updated : </span>
                <span>{moment(state?.updatedAt).format("DD-MMM-YYYY")}</span>
              </>
            )}
          </h6>
        </div>
        <div className="col-md-5 printer">
          <span
            style={{ margin: "0 10px" }}
            className={
              state?.status === "Pending"
                ? "pending"
                : state?.status === "Rejected"
                ? "rejected"
                : state?.status === "Re Submitted"
                ? "reSUbmitted"
                : state?.status === "Received to Darul Ifta"
                ? "recievedToDI"
                : state?.status === "Assigned Mufti"
                ? "assMufthi"
                : state?.status === "Mufti Answered"
                ? "mufthiAns"
                : state?.status === "Completed Verification"
                ? "completeVerification"
                : state?.status === "Published"
                ? "published"
                : ""
            }
          >
            {state?.status}
          </span>
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
                {subCategoryData?.length && (
                  <Autocomplete
                    id="controllable-states-demo"
                    size="small"
                    fullWidth
                    multiple
                    disabled={state?.status === "Rejected"}
                    options={subCategoryData || null}
                    getOptionLabel={(option) => option?.label}
                    isOptionEqualToValue={(option, value) =>
                      option?._id === value?._id
                    }
                    onChange={(event, newValue) =>
                      setSelectedSubCategory(newValue)
                    }
                    value={selectedSubCategory || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        disabled={state?.status === "rejected"}
                      />
                    )}
                  />
                )}
              </div>
              <div className="col-md-4">
                {madhabData?.length && (
                  <Autocomplete
                    error
                    size="small"
                    value={selectedMadhab}
                    fullWidth
                    disabled={state?.status === "Rejected"}
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
              <div className="col-md-4 second-col">
                {languageList?.length && (
                  <Autocomplete
                    size="small"
                    error
                    value={selectedLanguage}
                    fullWidth
                    disabled={state?.status === "Rejected"}
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
                      disabled={state?.status === "Rejected"}
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
                      disabled={state?.status === "Rejected"}
                      // {...register("longQuestion", {
                      //   required: "LongQuestion is required",
                      // })}
                    />
                    <div className="error">{errors?.longQuestion?.message}</div>
                  </div>
                </div>
              </div>
            </div>
            {state?.status !== "Rejected" && state?.status !== "Pending" && (
              <>
                <div className="fatwas-details-row written-section">
                  {/* <div className="col-md-3 first-col">
                    <Autocomplete
                      size="small"
                      value={selectedMufthi || ""}
                      fullWidth
                      onChange={(event, newValue) =>
                        setSelectedMufthi(newValue)
                      }
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
                  </div> */}
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
                  {state?.status !== "Received to Darul Ifta" && (
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
                          option?._id === value?._id
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Verified By" />
                        )}
                      />
                    </div>
                  )}
                </div>
                {state?.status !== "Received to Darul Ifta" && (
                  <>
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
                  </>
                )}
              </>
            )}
            {state?.status === "Received to Darul Ifta" && (
              <div className="btn-section">
                <div className="col-md-2">
                  <Button
                    type="submit"
                    variant="contained"
                    className="form-btn"
                    fullWidth
                  >
                    {state?.status === "Received to Darul Ifta"
                      ? "Assigned to mufti"
                      : "Submit"}
                  </Button>
                </div>
              </div>
            )}
            {/* Rejected */}
            {state?.status === "Pending" && (
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
