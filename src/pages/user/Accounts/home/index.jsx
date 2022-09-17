import * as React from "react";
import UserTab from "../../../../components/UserTab";
import DefaultImg from "../../../../assets/images/google-logo-9808-32x32.ico";
import DefaultImg1 from "../../../../assets/images/Minaret.svg";

import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import { Button, Card, DialogContent } from "@mui/material";
import DialogComponent from "../../../../components/DialogComponent";
import AskFatwasComponent from "../askFatwas";

export default function AccountHome() {
  const userDetails = {
    profile_pic: "../../../../assets/images/Minaret.svg",
    phone: "9400720209",
    name: "Sabeer Ali",
    email: "sabeer@gmail.com",
  };
  return (
    <>
      <div class="profile-1 d-flex py-1">
        <div class="col d-flex flex-column align-items-center">
          <div class="profile-img">
            <img class="profile-img" src={DefaultImg1} alt="" />
            {!userDetails?.profile_pic && (
              <span>
                <img
                  src="../../../../assets/images/google-logo-9808-32x32.ico"
                  alt=""
                  srcset=""
                />
              </span>
            )}

            {/* <img
              class="profile-img-1"
              src="../../../../assets/images/Minaret.svg"
              alt=""
            /> */}
          </div>
          <div class="">
            <div class="row p-3">
              <div className="col pointer">
                <SettingsIcon />
              </div>

              <div className="col">
                <MessageIcon />
              </div>
            </div>
          </div>
        </div>
        <div class="col d-flex align-items-center">
          <div class="">
            <div>
              <h2>{userDetails?.name || "Sabeer Ali"}</h2>
            </div>
            <div>
              <h6>
                {userDetails?.phone && <span>{userDetails?.phone} - </span>}
                {userDetails?.email}
              </h6>
            </div>

            <div>
              <h6>{userDetails?.address || "No Address - Found"}</h6>
            </div>
            <div className="row">
              <div className="col-6 ">
                <Card variant="outlined" sx={{ padding: 1, margin: "5px 0" }}>
                  Total Fatwas : 100
                </Card>
              </div>
              <div className="col">
                <Card variant="outlined" sx={{ padding: 1, margin: "5px 0" }}>
                  Answred : 75
                </Card>
              </div>
              <div className="row">
              <DialogComponent
              title="Ask Questions"
              >
            
                 <Button variant="contained" fullWidth>
                 
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
