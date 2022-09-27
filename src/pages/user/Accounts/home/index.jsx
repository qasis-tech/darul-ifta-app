import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Card } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import DefaultImg1 from "../../../../assets/images/Minaret.svg";

import UserTab from "../../../../components/UserTab";
import DialogComponent from "../../../../components/DialogComponent";
import { getLocal } from "../../../../utils/localStore";
import AskFatwasComponent from "../../Accounts/askFatwas";
import { useNavigate } from "react-router-dom";

import UserProfile from "../profile";

export default function AccountHome() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [dropdownList, setDropdownList] = useState({
    madhab: [
      { id: 1, label: "Hanafi", values: "hanafi" },
      { id: 2, label: "Shafi", values: "shafi" },
      { id: 3, label: "Other", values: "other" },
    ],
    category: [
      { id: 1, label: "Hanafi", values: "hanafi" },
      { id: 2, label: "Shafi", values: "shafi" },
      { id: 3, label: "Other", values: "other" },
    ],
  });

  useEffect(() => {
    getLocalData();
  }, []);

  const getLocalData = async () => {
    const data = await getLocal("@darul-ifta-login-details");
    setUserDetails(data);
  };

  const getAPIs = () => {
    // axios.get()
  };

  return (
    <>
      <div class="profile-1 d-flex py-1">
        <div class="col d-flex flex-column align-items-center">
          <div class="profile-img">
            {userDetails?.profile_pic ? (
              <span>
                <img
                  src={userDetails?.profile_pic + "" + "111"}
                  class="profile-img"
                  alt="profile images"
                  onError={(e) => {
                    e.target.src = <PersonIcon />;
                  }}
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
                  className="model-section"
                  fullWidth
                  mainComponent={<UserProfile />}
                  noBottom
                  size="xl"
                >
                  <SettingsIcon />
                </DialogComponent>
              </div>

              <div className="col">
                <MessageIcon />
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
                  className="fw-bold"
                >
                  Fatwas : 100
                </Card>
              </div>
              <div className="col">
                <Card
                  variant="outlined"
                  sx={{ padding: 1, margin: "5px 0", textAlign: "center" }}
                  className="fw-bold"
                >
                  Answred : 75
                </Card>
              </div>

              <div className="btn-section">
                <DialogComponent
                  title="Ask Questions"
                  className="model-section"
                  fullWidth
                  mainComponent={<AskFatwasComponent />}
                  noBottom
                  size="xl"
                >
                  <Button
                    variant="contained"
                    className="submit-btn"
                    fullWidth
                    onClick={getAPIs}
                  >
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
}
