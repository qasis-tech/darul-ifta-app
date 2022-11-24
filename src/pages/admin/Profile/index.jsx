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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <>
      <div className="admin-profile-update shadow bg-white">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                      {...register("displayName", { required: "Display Name is required" })}
                    />
                    <div className="error">{errors?.displayName?.message}</div>
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      label="First Name"
                      variant="outlined"
                      {...register("firstName", { required: "First Name is required" })}
                    />
                    <div className="error">{errors?.firstName?.message}</div>
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
                      {...register("lastName", { required: "Last Name is required" })}
                    />
                    <div className="error">{errors?.lastName?.message}</div>
                  </div>
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      label="Email"
                      variant="outlined"
                      {...register("email", {
                        required: "Email ID is required",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Invalid email Id ( eg: example@mail.com ) ",
                        },
                      })}
                    />
                    <div className="error">{errors?.email?.message}</div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      type="number"
                      label="Phone Number"
                      variant="outlined"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                      minLength: {
                        value: 10,
                        message: "Phone Number length must be 10 digit. ",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone Number length must be 10 digit. ",
                      },
                      })}
                    />
                    <div className="error">{errors?.phoneNumber?.message}</div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      size="small"
                      type="password"
                      label="Password"
                      variant="outlined"
                      {...register("password", { required: "Password is required" })}
                    />
                    <div className="error">{errors?.password?.message}</div>
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
