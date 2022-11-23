import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import {
  Button,
  TextField,
  Autocomplete,
  Grid,
  Typography,
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import FatwaAddComponent from "../../../components/FatwaAddComponent";
import getCategoryListApi from "../../../services/getCategoryList";
import getmadhabList from "../../../services/getMadhabList";
import SnackBar from "../../../components/common/Snackbar";
import { URLS } from "../../../config/urls.config";

import "./fatwas.details.styles.scss";
import Loader from "../../../components/common/Loader";
import DialogComponent from "../../../components/DialogComponent";
import RejectedReasonSection from "./components/RejectedReasonSection";
import getQuestionListApi from "../../../services/getQuestionsList";
import routerList from "../../../routes/routerList";

export default function FatwasDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [shortQuestion, setShortQuestion] = useState("");
  const [longQuestion, setLongQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [referenceList, setReferance] = useState([]);

  const [mufthiList, setMufthiList] = useState([]);
  const [selectedMufthi, setSelectedMufthi] = useState(null);
  const [selectedMufthiVerified, setSelectedMufthiVerified] = useState(null);
  const [selectedCheckedAndApprove, setSelectedCheckedAndApprove] =
    useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [isLoading, setLoader] = useState(false);
  const [closePopup, setClosePopup] = useState(false);
  const [subCategoryData, setSubCategory] = useState([]);
  const [state, setQuestionDetails] = useState(null);
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });

  const languageList = [
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ];

  const status = [
    { id: 1, title: "Pending" },
    // { id: 2, title: "Rejected" },
    // { id: 3, title: "Re Submitted" },
    { id: 4, title: "Received to Darul Ifta" },
    { id: 5, title: "Assigned Mufti" },
    { id: 6, title: "Mufti Answered" },
    { id: 7, title: "Completed Verification" },
    { id: 7, title: "Published" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCategory();
    getSubcategory();
    getMadhab();
    getMufthiApi();

    if (id) {
      getQuestionListApi(`/${id}`)
        .then(async (res) => {
          console.log(res);

          setReferance(res?.data?.reference);

          setQuestionDetails(res.data);
          setSelectedCategory(res.data?.category[0]);
          setSelectedSubCategory(res.data?.sub_category);
          setSelectedMadhab(res.data?.madhab);

          setSelectedLanguage(
            languageList.filter((fl) => fl.title === res?.data?.language)[0]
          );
          setShortQuestion(res.data?.short_question);
          setLongQuestion(res.data?.question);
          setSelectedMufthi(res.data?.mufti);
          setSelectedMufthiVerified(res.data?.verifier);
          setSelectedCheckedAndApprove(res?.data?.checked_approved);

          setAnswer(res.data?.answer);
          setSelectedMufthi(res?.data?.mufti);

          setSelectedStatus(
            status.filter((fl) => fl.title === res?.data?.status)[0]
          );
        })

        .catch((err) => {
          console.error(
            "Error in getQuestionListApi in admin/Fatwa details",
            err
          );
        });
    }
  }, []);

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
    navigate(-1);
  };

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
      .get(`${URLS.user}${URLS.signup}?userType=Mufthi,Student`)
      .then(({ data }) => {
        setLoader(false);
        setMufthiList(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
        setMufthiList([]);
      });
  };

  const mufthiVerified = mufthiList.filter(
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
      reference: [],
      answered_date: null,
      verified_date: null,
      mufti: null,
      verifier: null,
      reject_by: state?.reject_by,
      mufti_answered: state?.mufti_answered,
      reject_reason: state?.reject_reason,
      checked_approved: null,
    };
    axios
      .put(`${URLS.question}/${state._id}`, payload)
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

  const handlePublish = () => {
    setLoader(true);

    let payload = {
      madhab: selectedMadhab,
      category: selectedCategory,
      sub_category: selectedSubCategory,
      short_question: shortQuestion,
      question: longQuestion,
      language: selectedLanguage?.title,
      status: state.status,
      answer: answer,
      reference: referenceList,
      answered_date: state?.answered_date,
      verified_date: state?.verified_date,
      answered_by: state?.answered_by,
      verified_by: state?.verified_by,
      mufti: selectedMufthi,
      verifier: selectedMufthiVerified,
      reject_by: state?.reject_by,
      mufti_answered: state?.mufti_answered,
      reject_reason: state?.reject_reason,
    };

    let isError = { status: false, message: "" };

    if (state?.status === "Pending") {
      payload.verifier = null;
      payload.answer = null;
      payload.mufti = null;
      payload.reference = null;
    } else if (state?.status === "Received to Darul Ifta") {
      payload.verifier = null;
      payload.answer = null;
      payload.mufti = selectedMufthi;
      payload.status = "Assigned Mufti";
      payload.checked_approved = selectedCheckedAndApprove;

      if (selectedMufthi === null) {
        isError.status = true;
        isError.message = "Must select a mufthi";
      } else if (
        selectedMufthi?.user_type !== "Mufthi" &&
        selectedCheckedAndApprove === null
      ) {
        isError.status = true;
        isError.message = "Must select a Verifier(Checked and approved)";
      }
    } else if (state.status === "Assigned Mufti") {
      if (!selectedMufthiVerified) {
        isError.status = true;
        isError.message = "Verified by is Invalid";
      } else if (!answer) {
        isError.status = true;
        isError.message = "Answer is Invalid";
      } else {
        payload.answered_date = moment();
        payload.status = "Mufti Answered";
        payload.verifier = selectedMufthiVerified;
        payload.answer = answer;
        payload.reference = referenceList;
        payload.mufti_answered = true;
      }
    } else if (state.status === "Mufti Answered") {
      payload.status = "Completed Verification";
      payload.verified_date = moment();
    } else if (state.status === "Completed Verification") {
      payload.status = "Published";
    } else {
      alert("Somthing wrong");
      payload.answer = null;
      payload.mufti = null;
    }

    console.log("Result ===> ", payload);

    if (!isError.status) {
      console.log("API Called ===> ");
      axios
        .put(`${URLS.question}/${state._id}`, payload)
        .then((res) => {
          setLoader(false);
          console.log("res put accept api", res);
          if (res?.success) {
            navigate(
              `${routerList.admin.admin}/${routerList.admin.adminfatwas}`
            );
          }
        })
        .catch((err) => {
          setLoader(false);
          console.error("Error in profile edit", err);
        });
    } else {
      setLoader(false);

      // alert(isError.message);
      // isError.status = false;
      // isError.message = "";
    }
  };

  console.log("state =====>", state);

  const handleChangeStatus = (val) => {
    let temp = { ...state };
    temp.status = val.title;
    setQuestionDetails(temp);
    setSelectedStatus(val);
  };

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
          <Typography
            variant="span"
            sx={{ margin: "0 10px" }}
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
          </Typography>
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
                <Autocomplete
                  id="languages"
                  size="small"
                  fullWidth
                  options={languageList}
                  getOptionLabel={(option) => option?.title || ""}
                  value={selectedLanguage}
                  disabled={
                    state?.status === "Rejected" || state?.status === "Pending"
                  }
                  onChange={(event, newValue) => setSelectedLanguage(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value?.id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Language" />
                  )}
                />

                {!selectedLanguage?.title && (
                  <div className="error">{errors?.language?.message}</div>
                )}
              </div>
              <div className="col-md-4 ">
                <Autocomplete
                  id="subCategory"
                  size="small"
                  fullWidth
                  multiple
                  disabled={
                    state?.status === "Rejected" || state?.status === "Pending"
                  }
                  options={subCategoryData || null}
                  getOptionLabel={(option) => option?.label || ""}
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
              </div>
              <div className="col-md-4  second-col">
                <Autocomplete
                  id="madhabList"
                  size="small"
                  value={selectedMadhab}
                  fullWidth
                  disabled={
                    state?.status === "Rejected" || state?.status === "Pending"
                  }
                  onChange={(event, newValue) => {
                    setSelectedMadhab(newValue);
                  }}
                  options={madhabData}
                  getOptionLabel={(option) => option?.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option?._id === value?._id
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Madhab" />
                  )}
                />

                {!selectedMadhab?.title && (
                  <div className="error">{errors?.madhab?.message}</div>
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
                      onChange={(e) => setShortQuestion(e.target.value)}
                      disabled={
                        state?.status === "Rejected" ||
                        state?.status === "Pending"
                      }
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
                      onChange={(e) => setLongQuestion(e.target.value)}
                      disabled={
                        state?.status === "Rejected" ||
                        state?.status === "Pending"
                      }
                    />
                    <div className="error">{errors?.longQuestion?.message}</div>
                  </div>
                </div>
              </div>
            </div>
            {state?.status !== "Rejected" && state?.status !== "Pending" && (
              <>
                <div className="fatwas-details-row written-section">
                  <div className="col-md-3">
                    <Autocomplete
                      id="controllable-states-demo"
                      size="small"
                      value={selectedMufthi || ""}
                      fullWidth
                      options={mufthiList?.filter(
                        (fl) =>
                          fl?._id !== selectedMufthiVerified?._id &&
                          fl?._id !== selectedCheckedAndApprove?._id
                      )}
                      onChange={(event, newValue) => {
                        setSelectedMufthi(newValue);
                      }}
                      getOptionLabel={(option) => option?.name || ""}
                      isOptionEqualToValue={(option, value) =>
                        option._id === value._id
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Assigned To" 
                        {...register("assigned", { required: "This is required" })}
                        />
                      )}
                    />
                    {!selectedMufthi?.name && (
                    <div className="error">{errors?.assigned?.message}</div>
                  )}
                  </div>

                  {selectedMufthi?.user_type === "Student" && (
                    <div className="col-md-3">
                      <Autocomplete
                        id="controllable-states-demo"
                        size="small"
                        value={selectedCheckedAndApprove || ""}
                        fullWidth
                        options={mufthiList?.filter(
                          (fl) =>
                            fl?._id !== selectedMufthiVerified?._id &&
                            fl?._id !== selectedMufthi?._id
                        )}
                        onChange={(event, newValue) => {
                          setSelectedCheckedAndApprove(newValue);
                        }}
                        getOptionLabel={(option) => option?.name || ""}
                        isOptionEqualToValue={(option, value) =>
                          option._id === value._id
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Checked & Approve" />
                        )}
                      />
                      {/* {errors.assignedTo && (
                        <p className="text-danger">
                          {errors.assignedTo.message}
                        </p>
                      )} */}
                    </div>
                  )}
                  {state?.status !== "Received to Darul Ifta" && (
                    <div className="col-md-3">
                      <Autocomplete
                        id="mufthiList"
                        size="small"
                        fullWidth
                        options={mufthiVerified.filter(
                          (fl) =>
                            fl?.user_type !== "Student" &&
                            fl._id !== selectedCheckedAndApprove?._id
                        )}
                        value={selectedMufthiVerified || ""}
                        onChange={(event, newValue) => {
                          setSelectedMufthiVerified(newValue);
                        }}
                        getOptionLabel={(option) => option?.name || ""}
                        isOptionEqualToValue={(option, value) =>
                          option?._id === value?._id
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Verified By" 
                          {...register("Verified", { required: "This is required" })}
                          />
                        )}
                      />
                      {!selectedMufthiVerified?.name && (
                    <div className="error">{errors?.Verified?.message}</div>
                  )}
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
                              id="fatwa-answers"
                              label="Answer"
                              placeholder="Answers..."
                              multiline
                              fullWidth
                              rows={6}
                              value={answer}
                              onChange={(e) => setAnswer(e.target.value)}
                              InputLabelProps={{ shrink: true }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* reference */}

                    {referenceList && (
                      <FatwaAddComponent
                        referenceList={referenceList}
                        setReferance={setReferance}
                      />
                    )}
                  </>
                )}
              </>
            )}

            <Grid
              container
              spacing={1}
              sx={{ paddingTop: 5 }}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item sm={3}>
                {(state?.status === "Mufti Answered" ||
                  state?.status === "Completed Verification" ||
                  state?.status === "Published") && (
                  <Autocomplete
                    id="status"
                    size="small"
                    options={status}
                    value={selectedStatus || ""}
                    onChange={(event, newValue) => handleChangeStatus(newValue)}
                    getOptionLabel={(option) => option?.title || ""}
                    isOptionEqualToValue={(option, value) =>
                      option?.title === value?.title
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  />
                )}
              </Grid>
              {state?.status !== "Published" && (
                <Grid item sm={3}>
                  {state?.status === "Received to Darul Ifta" ||
                  state?.status === "Assigned Mufti" ||
                  state?.status === "Mufti Answered" ||
                  state?.status === "Completed Verification" ? (
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        className="form-btn"
                        onClick={handlePublish}
                      >
                        {state?.status === "Received to Darul Ifta"
                          ? "Assigned to mufti"
                          : state?.status === "Assigned Mufti"
                          ? "Mufthi Answered"
                          : state?.status === "Mufti Answered"
                          ? "Completed Verification"
                          : state?.status === "Completed Verification"
                          ? "Publish"
                          : "Submit"}
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              )}
            </Grid>

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
}
