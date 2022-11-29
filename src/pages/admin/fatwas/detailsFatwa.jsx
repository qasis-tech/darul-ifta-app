import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

import {
  Button,
  TextField,
  Autocomplete,
  Grid,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import FatwaAddComponent from "../../../components/FatwaAddComponent";
import getCategoryListApi from "../../../services/getCategoryList";
import getmadhabList from "../../../services/getMadhabList";

import { URLS } from "../../../config/urls.config";
import "./fatwas.details.styles.scss";
import Loader from "../../../components/common/Loader";

import RejectedReasonSection from "./components/RejectedReasonSection";
import getQuestionListApi from "../../../services/getQuestionsList";
import routerList from "../../../routes/routerList";

export default function FatwasDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [madhabData, setMadhabData] = useState([]);

  const [referenceList, setReferance] = useState([]);

  const [mufthiList, setMufthiList] = useState([]);
  const [selectedMufthi, setSelectedMufthi] = useState(null);

  const [selectedCheckedAndApprove, setSelectedCheckedAndApprove] =
    useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [isLoading, setLoader] = useState(false);

  const [subCategoryData, setSubCategory] = useState([]);
  const [state, setQuestionDetails] = useState(null);
  const [rejectPopup, setRejectPopup] = useState(false);

  const [content, setContent] = useState(null);

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
    cleanHTML: {
      removeEmptyElements: true,
      fillEmptyParagraph: false,
    },
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    getFieldState,
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

          setValue("category", res?.data?.sub_category);
          setValue("madhab", res.data?.madhab);
          let index1 = languageList.findIndex(
            (fl) => fl.title === res?.data?.language
          );
          if (index1 !== -1) {
            setValue("language", languageList[index1]);
          }
          setValue("assignedTo", res.data?.mufti);
          setValue("shortQuestion", res.data?.short_question);
          setValue("longQuestion", res.data?.question);
          setValue("verifier", res.data?.verifier);
          setValue("check_approved", res?.data?.checked_approved);

          setContent(res?.data?.answer);

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
      .get(`${URLS.user}${URLS.signup}?userType=Mufthi,Students`)
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

  const handlePublish = (params) => {
    const {
      language,
      longQuestion,
      shortQuestion,
      madhab,
      category,
      verifier,
      assignedTo,
      check_approved,
    } = params;
    setLoader(true);

    let payload = {
      madhab: madhab,
      category: selectedCategory,
      sub_category: category,
      short_question: shortQuestion,
      question: longQuestion,
      language: language?.title,
      status: state.status,
      answer: content,
      reference: referenceList,
      answered_date: state.answered_date,
      verified_date: state.verified_date,
      mufti: assignedTo,
      verifier: verifier,
      reject_by: state.reject_by,
      mufti_answered: state.mufti_answered,
      reject_reason: state.reject_reason,
      checked_approved: check_approved,
    };

    if (state?.status === "Pending") {
      payload.verifier = null;
      payload.answer = null;
      payload.mufti = null;
      payload.reference = null;
      payload.status = "Received to Darul Ifta";
    } else if (state?.status === "Received to Darul Ifta") {
      payload.answer = null;
      payload.status = "Assigned Mufti";

      if (assignedTo?.user_type === "Students") {
        payload.checked_approved = check_approved;
      }
    } else if (state.status === "Assigned Mufti") {
      payload.answered_date = moment();
      payload.status = "Mufti Answered";
      payload.verifier = verifier;
      payload.answer = content;
      payload.reference = referenceList;
      payload.mufti_answered = true;
    } else if (state.status === "Mufti Answered") {
      payload.status = "Completed Verification";
      payload.verified_date = moment();
    } else if (state.status === "Completed Verification") {
      payload.status = "Published";
    } else {
      alert("Somthing wrong");
    }
    console.log("Result ===> ", payload);

    console.log("API is CALLED ");

    if (
      state?.status !== "Pending" &&
      state?.status !== "Received to Darul Ifta"
    ) {
      if (content === "<p><br></p>") {
        toast("Answer cannot be empty");
        setLoader(false);
      } else {
        axios
          .put(`${URLS.question}/${state._id}`, payload)
          .then((res) => {
            setLoader(false);
            if (res?.success) {
              toast(res?.message, {
                onClose: () =>
                  navigate(
                    `${routerList.admin.admin}/${routerList.admin.adminfatwas}`
                  ),
              });
            }
          })
          .catch((err) => {
            toast(err.message);
            setLoader(false);
            console.error("Error in profile edit", err);
          });
      }
    } else {
      axios
        .put(`${URLS.question}/${state._id}`, payload)
        .then((res) => {
          setLoader(false);
          if (res?.success) {
            toast(res?.message, {
              onClose: () =>
                navigate(
                  `${routerList.admin.admin}/${routerList.admin.adminfatwas}`
                ),
            });
          }
        })
        .catch((err) => {
          toast(err.message);
          setLoader(false);
          console.error("Error in profile edit", err);
        });
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
                / <span className="id-style"> Updated : </span>
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
        <Paper elevation={2}>
          <form onSubmit={handleSubmit(handlePublish)}>
            <div className="fatwas-details-container">
              <div className="fatwas-details-row">
                <div className="col-md-4 first-col">
                  <Controller
                    control={control}
                    name="language"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="fatwasDetailsLanguage"
                        size="small"
                        disabled={
                          state?.status === "Rejected" ||
                          state?.status === "Pending"
                        }
                        options={languageList}
                        getOptionLabel={(option) => option.title || ""}
                        isOptionEqualToValue={(option, val) =>
                          option?.id === val?.id
                        }
                        value={value || ""}
                        onChange={(e, val) => onChange(val)}
                        renderInput={(params) => (
                          <TextField {...params} label="Language" />
                        )}
                      />
                    )}
                  />
                  {errors?.language && (
                    <div className="error py-1">Language is required</div>
                  )}
                </div>
                <div className="col-md-4 ">
                  <Controller
                    control={control}
                    name="category"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="fatwasDetailsCategory"
                        size="small"
                        fullWidth
                        multiple
                        disabled={
                          state?.status === "Rejected" ||
                          state?.status === "Pending"
                        }
                        options={subCategoryData || null}
                        getOptionLabel={(option) => option?.label || ""}
                        isOptionEqualToValue={(option, value) =>
                          option?._id === value?._id
                        }
                        value={value || []}
                        onChange={(e, val) => onChange(val)}
                        renderInput={(params) => (
                          <TextField {...params} label="Category" />
                        )}
                      />
                    )}
                  />
                  {errors.category && (
                    <div className="error">Category is required</div>
                  )}
                </div>
                <div className="col-md-4  second-col">
                  <Controller
                    control={control}
                    name="madhab"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="fatwaDetailsMadhabList"
                        size="small"
                        fullWidth
                        disabled={
                          state?.status === "Rejected" ||
                          state?.status === "Pending"
                        }
                        options={madhabData}
                        getOptionLabel={(option) => option?.title || ""}
                        isOptionEqualToValue={(option, value) =>
                          option?._id === value?._id
                        }
                        value={value || ""}
                        onChange={(e, val) => onChange(val)}
                        renderInput={(params) => (
                          <TextField {...params} label="Madhab" />
                        )}
                      />
                    )}
                  />
                  {errors.madhab && (
                    <div className="error">madhab is required</div>
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
                        disabled={
                          state?.status === "Rejected" ||
                          state?.status === "Pending"
                        }
                        {...register("shortQuestion", {
                          required: "Short Question is required",
                        })}
                        InputLabelProps={{
                          shrink: getValues("longQuestion") ? true : false,
                        }}
                      />
                      {errors?.shortQuestion && (
                        <div className="error">
                          {errors?.shortQuestion?.message}
                        </div>
                      )}
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
                        disabled={
                          state?.status === "Rejected" ||
                          state?.status === "Pending"
                        }
                        {...register("longQuestion", {
                          required: "Long Question is required",
                        })}
                        InputLabelProps={{
                          shrink: getValues("longQuestion") ? true : false,
                        }}
                      />
                      {errors?.longQuestion && (
                        <div className="error">
                          {errors?.longQuestion?.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {state?.status !== "Rejected" && state?.status !== "Pending" && (
                <>
                  <div className="fatwas-details-row written-section">
                    <div className="col-md-3">
                      <Controller
                        control={control}
                        name="assignedTo"
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            id="fatwasDetailsAssignedTo"
                            size="small"
                            fullWidth
                            options={mufthiList.filter(
                              (fl) =>
                                fl?._id !== getValues("verifier._id") &&
                                fl?._id !== getValues("check_approved._id")
                            )}
                            getOptionLabel={(option) => option?.name || ""}
                            isOptionEqualToValue={(option, value) =>
                              option?._id === value?._id
                            }
                            value={watch("assignedTo") || ""}
                            onChange={(e, val) => onChange(val)}
                            renderInput={(params) => (
                              <TextField {...params} label="Assigned To" />
                            )}
                          />
                        )}
                      />
                      {errors.assignedTo && (
                        <div className="error">Mufthi is required</div>
                      )}
                    </div>

                    {watch("assignedTo")?.user_type === "Students" && (
                      <div className="col-md-3">
                        <Controller
                          control={control}
                          name="check_approved"
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => (
                            <Autocomplete
                              id="fatwasDetailsCheckedApproved"
                              size="small"
                              fullWidth
                              options={mufthiList?.filter(
                                (fl) =>
                                  fl?._id !== getValues("assignedTo._id") &&
                                  fl?.user_type !== "Students" &&
                                  fl?._id !== getValues("verifier._id")
                              )}
                              getOptionLabel={(option) => option?.name || ""}
                              isOptionEqualToValue={(option, value) =>
                                option._id === value._id
                              }
                              value={watch("check_approved") || ""}
                              onChange={(e, val) => onChange(val)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Checked & Approve"
                                />
                              )}
                            />
                          )}
                        />

                        {errors?.check_approved && (
                          <div className="error py-1">
                            checked and approved is required
                          </div>
                        )}
                      </div>
                    )}

                    <div className="col-md-3">
                      <Controller
                        control={control}
                        name="verifier"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            id="fatwaDetailsVerifier"
                            size="small"
                            fullWidth
                            options={mufthiList.filter(
                              (fl) =>
                                fl?.user_type !== "Students" &&
                                fl?._id !== getValues("assignedTo._id") &&
                                fl?._id !== getValues("check_approved._id")
                            )}
                            getOptionLabel={(option) => option?.name || ""}
                            isOptionEqualToValue={(option, value) =>
                              option?._id === value?._id
                            }
                            value={watch("verifier") || ""}
                            onChange={(e, val) => onChange(val)}
                            renderInput={(params) => (
                              <TextField {...params} label="Verified By" />
                            )}
                          />
                        )}
                      />
                      {errors?.verifier && (
                        <div className="error py-1">Mufthi is required</div>
                      )}
                    </div>
                  </div>
                  {state?.status !== "Received to Darul Ifta" && (
                    <>
                      <div className="qshort-section">
                        <div className="qshort-container">
                          <div className="qshort-row">
                            <div className="col-md-12">
                              <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                // onChange={(newContent) => setContent(newContent)}
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
                      onChange={(event, val) => handleChangeStatus(val)}
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
                    {state?.status === "Pending" ||
                    state?.status === "Received to Darul Ifta" ||
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
                          variant="contained"
                          className="form-btn"
                          type="submit"
                        >
                          {state?.status === "Pending"
                            ? "Accept"
                            : state?.status === "Received to Darul Ifta"
                            ? "Assigned to mufti"
                            : state?.status === "Assigned Mufti"
                            ? "Mufthi Answered"
                            : state?.status === "Mufti Answered"
                            ? "Completed Verification"
                            : state?.status === "Completed Verification"
                            ? "Publish"
                            : "Submit"}
                        </Button>

                        {state?.status === "Pending" && (
                          <Button
                            variant="contained"
                            className="bg-danger ms-4"
                            onClick={() => setRejectPopup(true)}
                          >
                            Reject
                          </Button>
                        )}
                      </Grid>
                    ) : null}
                  </Grid>
                )}
              </Grid>
            </div>
          </form>
          <Dialog
            fullWidth
            maxWidth="md"
            open={rejectPopup}
            keepMounted
            onClose={() => setRejectPopup(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Reject question</DialogTitle>
            <Divider />

            <DialogContent>
              <RejectedReasonSection
                state={state}
                close={() => setRejectPopup(false)}
              />
            </DialogContent>
          </Dialog>
        </Paper>
      )}
    </div>
  );
}
