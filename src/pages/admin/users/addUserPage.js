import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./adduser.styles.scss";
import axios from "axios";
import { URLS } from "../../../config/urls.config";

const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function AddUser() {
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [roles, setRoles] = useState([
    { id: 1, title: "Super Admin" },
    { id: 2, title: "Mufthi" },
    { id: 3, title: "Students" },
    { id: 4, title: "User" },
  ]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [status, setStatus] = useState([
    { id: 1, title: "Pending" },
    { id: 2, title: "Rejected" },
    { id: 3, title: "Re Submitted" },
    { id: 4, title: "Received to Darul Ifta" },
    { id: 5, title: "Assigned Mufti" },
    { id: 6, title: "Mufti Answered" },
    { id: 7, title: "Completed Verification" },
    { id: 8, title: "Published" },
  ]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userToken, setUserToken] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getmadhabApi();
  }, []);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("@darul-ifta-login-details"));
  //   console.log("user", user);
  //   if (user) {
  //     setUserId(user._id);
  //     setUserToken(user.initial_token);
  //   }
  // }, []);

  const getmadhabApi = () => {
    // setLoader(true);
    axios
      .get(URLS.madhab, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // setLoader(false);
        console.log("res madhabb1111==>", res.data);
        setMadhabData(res.data.data);
      })
      .catch((err) => {
        // setLoader(false);
        console.log("error madhab", err);
      });
  };

  const handleSave = ({
    name,
    displayName,
    email,
    mobileNumber,
    password,
    address,
  }) => {
    const bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("display_title", displayName);
    bodyFormData.append("user_type", selectedRoles.title);
    // bodyFormData.append("name", name);
    // bodyFormData.append("name", name);

    // axios
    //   .put(`${URLS.user}${URLS.signup}${userId}`,bodyFormData, {
    //     headers: {
    //       Authorization: `${userToken}`,
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res user save ===>>", res);
    //   })
    //   .catch((err) => {
    //     console.log("Errors in user save", err);
    //   });
  };

  return (
    <div className="add-user-section">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="add-user-container">
          <div className="add-user-row">
            <div className="col-md-6 first-col">
              <TextField
                id="outlined-basic"
                label="Name"
                size="small"
                fullWidth
                variant="outlined"
                {...register("name", { required: "Name is required" })}
              />
              <div className="error">{errors?.name?.message}</div>
            </div>
            <div className="col-md-6 second-col">
              <TextField
                id="outlined-basic"
                label="Display Name"
                size="small"
                fullWidth
                variant="outlined"
                {...register("displayName", {
                  required: "DisplayName is required",
                })}
              />
              <div className="error">{errors?.displayName?.message}</div>
            </div>
          </div>
          <div className="add-user-row">
            <div className="col-md-6 first-col">
              <TextField
                id="outlined-basic"
                label="Email"
                size="small"
                fullWidth
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
            <div className="col-md-6 second-col">
              <TextField
                id="outlined-basic"
                label="Whatsapp Number"
                size="small"
                fullWidth
                variant="outlined"
                {...register("mobileNumber", {
                  required: "MobileNumber is required",
                  pattern: {
                    value:
                      /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
                    message: "Invalid MobileNumber ",
                  },
                })}
              />
              <div className="error">{errors?.mobileNumber?.message}</div>
            </div>
          </div>
          <div className="add-user-row">
            <div className="col-md-6 first-col">
              <TextField
                id="outlined-basic"
                label="Password"
                size="small"
                fullWidth
                variant="outlined"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 character",
                  },
                })}
              />
              <div className="error">{errors?.password?.message}</div>
            </div>
            <div className="col-md-3 second-col">
              {roles?.length ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={roles}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, val) => setSelectedRoles(val)}
                  value={selectedRoles}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                    Roles"
                      {...register("roles", {
                        required: "Roles is required",
                      })}
                    />
                  )}
                />
              ) : null}
              {!selectedRoles.title ? (
                <div className="error">{errors?.roles?.message}</div>
              ) : null}
            </div>
            <div className="col-md-3 second-col">
              {madhabData?.length ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={madhabData}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, val) => setSelectedMadhab(val)}
                  value={selectedMadhab}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                    Madhab"
                      {...register("madhab", {
                        required: "Madhab is required",
                      })}
                    />
                  )}
                />
              ) : null}
              {!selectedMadhab.title ? (
                <div className="error">{errors?.madhab?.message}</div>
              ) : null}
            </div>
          </div>
          <div className="add-user-row">
            <div className="col-md-6 first-col">
              <TextField
                id="outlined-basic"
                label="Address"
                size="small"
                fullWidth
                variant="outlined"
                {...register("address", {
                  required: "Address is required",
                })}
              />
              <div className="error">{errors?.address?.message}</div>
            </div>
            <div className="col-md-6 second-col">
              {status?.length ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={status}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, val) => setSelectedStatus(val)}
                  value={selectedStatus}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                      Active Status"
                      {...register("status", {
                        required: "Status is required",
                      })}
                    />
                  )}
                />
              ) : null}
              {!selectedStatus.title ? (
                <div className="error">{errors?.status?.message}</div>
              ) : null}
            </div>
          </div>
          <div className="btn-section">
            <div className="col-md-1">
              <Button
                variant="contained"
                className="form-btn"
                type="submit"
                fullWidth
              >
                SAVE
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
