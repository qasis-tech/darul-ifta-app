import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DefaultImg1 from "../../../../assets/images/Minaret.svg";

import UserTab from "../../../../components/UserTab";
import DialogComponent from "../../../../components/DialogComponent";
import AskFatwasComponent from "../../Accounts/askFatwas";
import UserProfile from "../profile";
import { URLS } from "../../../../config/urls.config";
import getQuestionListApi from "../../../../services/getQuestionsList";

import "./account.home.styles.scss";
import { addUserLoginDetails } from "../../../../redux/actions";
import getUserDetailsApi from "../../../../services/getUserDetails";

const AccountHome = ({
  userLoginDetails,
  apiTriggeres,
  addUserLoginDetails,
}) => {
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);
  const [askPopup, setAskPopup] = useState(false);
  const [isAskedFatwa, setIsAskedFatwa] = useState(false);

  const uploadedImage = React.useRef(null);


  useEffect(() => {
    getUserDetailsApi(`/${userLoginDetails?._id}`).then(res => {
      addUserLoginDetails(res)
      setUserDetails(res);
      let params = `?userid=${res?._id}`;
      let params2 = `?status=Published&userid=${res?._id}`;
      getQuestionListApi(params)
        .then((res) => {
          setLoader(false);
          setQuestionCount(res.count);
        })
        .catch((err) => {
          console.error("Error in getQuestionListApi", err);
          setQuestionCount(0);
        });

      getQuestionListApi(params2)
        .then((res) => {
          setLoader(false);
          setAnswerCount(res.count);
        })
        .catch((err) => {
          console.error("Error in getQuestionListApi", err);
          setAnswerCount(0);
        });
    })
    console.log("user Login Details", userLoginDetails)
  }, []);

  useEffect(() => {
    if (isAskedFatwa) {

    }
  }, [isAskedFatwa])


  const handleImageUpload = (e) => {
    setLoader(true);
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append("user_type", userLoginDetails?.user_type);
    formData.append("user_status", userLoginDetails?.user_status);
    formData.append("profile_pic", file);

    axios
      .put(`${URLS.user}${URLS.signup}/${userLoginDetails?._id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoader(false);
        if (res?.success) {
          toast(res.message);
        } else {
          toast(res.message);
        }
        addUserLoginDetails(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error in profile edit", err);
      });
  };
  const handleUserDetails = (val, field) => {
    const temp = { ...userDetails };
    temp[`${field}`] = val;
    setUserDetails(temp);

    const formData = new FormData();
    formData.append("name", userLoginDetails?.name);
    formData.append("display_title", userLoginDetails?.display_title);
    formData.append("user_type", userLoginDetails?.user_type);
    formData.append("user_status", userLoginDetails?.user_status);
    formData.append("username", userLoginDetails?.username);
    formData.append("phone", userLoginDetails?.phone);
    formData.append("madhab", userLoginDetails?.madhab);
    formData.append("address", userLoginDetails?.address);
    formData.append("street_address", userLoginDetails?.address);
    formData.append("pin_code", userLoginDetails?.pin_code);
    formData.append("profile_pic", userLoginDetails?.profile_pic);

    axios
      .put(`${URLS.user}${URLS.signup}/${userLoginDetails._id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("resputtt image file==>", res);
      })
      .catch((err) => {
        console.error("Error in image edit", err);
      });
  };

  return (
    <>
      <div className="profile-1">
        <div className="container profile-container d-flex py-1 px-5">
          <div className="col d-flex flex-column align-items-center">
            <div className="profile-img">
              <img
                src={userLoginDetails?.profile_pic}
                ref={uploadedImage}
                className="profile-img"
                alt="profile images"
                onError={(e) => (e.target.src = DefaultImg1)}

              />
            </div>
            <div className="">
              <div className="row">
                <div className="col pointer">
                  <IconButton
                    color="primary"
                    aria-label="Setting"
                    component="label"
                  >
                    <SettingsIcon
                      className="profile-icons"
                      onClick={() => setProfilePopup(true)}
                    />
                  </IconButton>
                </div>

                <div className="col">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden type="file" onChange={handleImageUpload} />
                    <PhotoCamera className="profile-icons" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          <div className="col d-flex align-items-center details">
            <div className="details-responsive">
              <div>
                <Typography className="user-name" variant="h4">
                  {userLoginDetails?.name || "N/A"}
                </Typography>
              </div>
              <div className="second-section">
                <Typography variant="subtitle2">
                  {userDetails?.phone || (
                    <span className="text-danger fs-6">
                      Mobile Number - Not Found
                    </span>
                  )}
                </Typography>

                <Typography variant="subtitle2">
                  {userDetails?.email || (
                    <span className="text-danger fs-6">
                      Email ID - Not Found
                    </span>
                  )}
                </Typography>
              </div>

              <div className="mb-2">
                <Typography variant="subtitle2">
                  {userDetails?.address || (
                    <span className="text-danger fs-6">
                      Address - Not Found
                    </span>
                  )}
                </Typography>
              </div>
              <div className="row">
                <div className="col">
                  <Paper elevation={1}>
                    <Typography
                      variant="subtitle2"
                      className="fw-bold"
                      align="center"
                      p={1}
                    >
                      Fatwas : {questionCount || "N/A"}
                    </Typography>
                  </Paper>
                </div>
                <div className="col">
                  <Paper elevation={1}>
                    <Typography
                      variant="subtitle2"
                      className="fw-bold"
                      align="center"
                      p={1}
                    >
                      Answered : {answerCount || "N/A"}
                    </Typography>
                  </Paper>
                </div>

                <div className="btn-section">
                  <Dialog
                    fullWidth
                    maxWidth="md"
                    open={askPopup}
                    keepMounted
                    onClose={() => setAskPopup(false)}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>Ask New Fatwa (Question) </DialogTitle>
                    <Divider />
                    <DialogContent>
                      <AskFatwasComponent close={() => setAskPopup(false)} setIsAskedFatwa={setIsAskedFatwa} />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="contained"
                    className="submit-btn mt-2"
                    fullWidth
                    onClick={() => {
                      userLoginDetails?.profileComplete === "Completed"
                        ? setAskPopup(true)
                        : setProfilePopup(true);
                    }}
                  >
                    Ask Fatwa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserTab isAskedFatwa={isAskedFatwa} />
        <Dialog
          fullWidth
          maxWidth="md"
          open={profilePopup}
          keepMounted
          onClose={() => setProfilePopup(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>User Profile</DialogTitle>
          <Divider />
          <DialogContent>
            <UserProfile close={() => setProfilePopup(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  addUserLoginDetails: (payload) => dispatch(addUserLoginDetails(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountHome);
