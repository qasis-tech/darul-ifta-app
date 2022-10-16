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

import UserProfile from "../profile";
import "./account.home.styles.scss";

const AccountHome = ({ userLoginDetails }) => {
  const [showImage, setShowImage] = useState(true);
  const [count, setCount] = useState(0);
  const [closePopup, setClosePopup] = useState(true);

  const handleImageError = (e) => setShowImage(false);
  const getCount = (c) => setCount(c);

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
                  <SettingsIcon onClick={() => closePopup(false)} />
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
                  <input hidden accept="image/*" type="file" />
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
                  Fatwas : {count || "N/A"}
                </Card>
              </div>
              <div className="col">
                <Card
                  variant="outlined"
                  sx={{ padding: 1, margin: "5px 0", textAlign: "center" }}
                  className="fw-bold shadow border-0"
                >
                  Answered : 75
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
                      <AskFatwasComponent />
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
      <UserTab getData={getCount} />
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AccountHome);
