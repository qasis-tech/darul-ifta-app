import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Button, Card } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";

import DefaultImg1 from "../../../../assets/images/Minaret.svg";

import UserTab from "../../../../components/UserTab";
import DialogComponent from "../../../../components/DialogComponent";
import { getLocal } from "../../../../utils/localStore";
import AskFatwasComponent from "../../Accounts/askFatwas";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UserProfile from "../profile";
import "./account.home.styles.scss";
const AccountHome = ({ userLoginDetails }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    getLocal().then((res) => setUserDetails(res));
  }, []);

  const getAPIs = () => {};

  console.log("userdetailss--->", userDetails);
  const handleImageError = (e) => {
    setShowImage(false);
  };

  return (
    <>
      <div class="profile-1 d-flex py-1">
        <div class="col d-flex flex-column align-items-center">
          <div class="profile-img">
            {showImage ? (
              <span>
                <img
                  src={userDetails?.profile_pic}
                  class="profile-img"
                  alt="profile images"
                  // onError={(e) => {
                  //   e.target.src = <PersonIcon />;
                  // }}
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
                  mainComponent={<UserProfile />}
                  noBottom
                  size="xl"
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
              <h2>{userDetails?.name || "N/A"}</h2>
            </div>
            <div>
              <h6>
                {userDetails?.phone || (
                  <span className="text-danger">Mobile Number - Not Found</span>
                )}
              </h6>

              <h6>
                {userDetails?.email || (
                  <span className="text-danger">Email ID - Not Found</span>
                )}
              </h6>
            </div>

            <div>
              <h6>
                {userDetails?.address || (
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
                  Fatwas : 100
                </Card>
              </div>
              <div className="col">
                <Card
                  variant="outlined"
                  sx={{ padding: 1, margin: "5px 0", textAlign: "center" }}
                  className="fw-bold shadow border-0"
                >
                  Answred : 75
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
                      <UserProfile />
                    ) : (
                      <AskFatwasComponent />
                    )
                  }
                  noBottom
                  size="xl"
                >
                  <Button variant="contained" className="submit-btn" fullWidth>
                    Ask Fatwa
                  </Button>
                </DialogComponent>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserTab />
    </>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AccountHome);
