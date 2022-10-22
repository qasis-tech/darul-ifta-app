import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Button, Card } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import DefaultImg1 from "../../../../assets/images/Minaret.svg";

import UserTab from "../../../../components/UserTab";
import DialogComponent from "../../../../components/DialogComponent";
import AskFatwasComponent from "../../Accounts/askFatwas";
import { StoreLocal } from "../../../../utils/localStore";

import UserProfile from "../profile";
import "./account.home.styles.scss";
import axios from "axios";
import { URLS } from "../../../../config/urls.config";

const AccountHome = ({ userLoginDetails }) => {
  console.log("userLoginDetails", userLoginDetails);
  const [showImage, setShowImage] = useState(true);
  const [questionCount, setquestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [closePopup, setClosePopup] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setUserDetails(userLoginDetails);
  }, []);

  const getFileObj = async (file) => {
    console.log("file", file);
    let result = await fetch(file)
      .then((r) => r.blob())
      .then((blobFile) => {
        let imageName = file.split("/").pop();
        let fileExt = imageName.split(".").pop();
        return new File([blobFile], `${imageName}`, {
          type: `image/${fileExt}`,
        });
      });
    return result;
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
    formData.append("profile_pic", val[0]);

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

  const handleImageError = (e) => setShowImage(false);
  const getQuestionCount = (c) => {
    setquestionCount(c);
  };

  const getAnswerCount = (c) => {
    setAnswerCount(c);
  };

  return (
    <>
      <div class="profile-1 d-flex py-1">
        <div class="col d-flex flex-column align-items-center">
          <div class="profile-img">
            {showImage ? (
              <span>
                <img
                  src={userLoginDetails?.profile_pic}
                  class="profile-img"
                  alt="profile images"
                  onError={handleImageError}
                />
              </span>
            ) : (
              <img
                class="profile-img"
                src={DefaultImg1}
                alt="Profile default image"
              />
            )}
          </div>
          <div class="">
            <div class="row p-3">
              <div className="col pointer">
                <DialogComponent
                  title="User Profile"
                  title2="user must completed profile then only permission to ask question"
                  className="model-section"
                  fullWidth
                  mainComponent={<UserProfile closePopup={setClosePopup} />}
                  noBottom
                  size="xl"
                  close={closePopup}
                >
                  <SettingsIcon />
                </DialogComponent>
              </div>

              <div className="col d-flex align-items-center">
                <MessageIcon />
              </div>
              <div className="col">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) =>
                      handleUserDetails(e.target.files, "profile_pic")
                    }
                  />
                  <PhotoCamera />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div class="col d-flex align-items-center details">
          <div class="">
            <div>
              <h2>{userLoginDetails?.name || "N/A"}</h2>
            </div>
            <div>
              <h6>
                {userLoginDetails?.phone || (
                  <span className="text-danger">Mobile Number - Not Found</span>
                )}
              </h6>

              <h6>
                {userLoginDetails?.email || (
                  <span className="text-danger">Email ID - Not Found</span>
                )}
              </h6>
            </div>

            <div>
              <h6>
                {userLoginDetails?.address || (
                  <span className="text-danger">Address - Not Found</span>
                )}
              </h6>
            </div>
            <div className="row">
              <div className="col-6 ">
                <Card
                  variant="outlined"
                  sx={{ padding: 1, margin: "5px 0", textAlign: "center" }}
                  className="fw-bold shadow border-0"
                >
                  Fatwas : {questionCount || "N/A"}
                </Card>
              </div>
              <div className="col">
                <Card
                  variant="outlined"
                  sx={{ padding: 1, margin: "5px 0", textAlign: "center" }}
                  className="fw-bold shadow border-0"
                >
                  Answered : {answerCount || "N/A"}
                </Card>
              </div>

              <div className="btn-section">
                <DialogComponent
                  title={
                    userLoginDetails?.profileComplete === "Incomplete"
                      ? "User Profile"
                      : "Ask Questions"
                  }
                  title2={userLoginDetails?.profileComplete === "Incomplete"}
                  className="model-section"
                  fullWidth
                  mainComponent={
                    userLoginDetails?.profileComplete === "Incomplete" ? (
                      <UserProfile closePopup={setClosePopup} />
                    ) : (
                      <AskFatwasComponent closePopup={setClosePopup} />
                    )
                  }
                  noBottom
                  size="xl"
                  close={closePopup}
                >
                  <Button
                    variant="contained"
                    className="submit-btn"
                    fullWidth
                    onClick={() => setClosePopup(false)}
                  >
                    Ask Fatwa
                  </Button>
                </DialogComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserTab
        getQuestionData={getQuestionCount}
        getAnswerData={getAnswerCount}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AccountHome);
