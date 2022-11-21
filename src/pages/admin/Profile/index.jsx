import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";

import Profile from "../../../assets/Minaret.svg";
import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";
import { Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import "./admin.profile.styles.scss";

export default function AdminProfile() {
  return (
    <>
      <div className="admin-profile-update shadow bg-white">
        <form>
          <div className="admin-profile-container">
            <div className="row">
              <div className="col-md-3">
                <div className="image-wrapper">
                  <img
                    src={Profile}
                    width="250"
                    height="250"
                    alt="profile Image"
                  />
                </div>
                <div className="row d-flex justify-content-around">
                  <div className="col-md-5">
                    <Typography>Profile Name</Typography>
                  </div>
                  <div className="profile-remove col-md-2">
                    <Typography>
                      <DeleteOutlineOutlinedIcon className="delete-icon" />
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      label="Dispaly Name"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      label="First Name"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      label="Last Name"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      label="Email"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      label="Phone Number"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                  <div className="col-md-1">
                    <Button
                      variant="contained"
                      className="form-btn"
                      type="submit"
                      fullWidth
                    >
                      Update
                    </Button>
                  </div>
                </div>
            </div>
          </div>
        </form>

        {/* {errorPopup.visible && (
            <SnackBar
              visible={errorPopup.visible}
              message={errorPopup.message}
              type={errorPopup.type}
              title={errorPopup.title}
              onClose={() => handleCloseError()}
            />
          )} */}
      </div>
    </>
  );
}
