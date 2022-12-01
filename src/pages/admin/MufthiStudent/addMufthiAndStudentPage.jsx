import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "yup-phone";
// import "./adduser.styles.scss";

import {URLS} from "../../../config/urls.config"
import Loader from "../../../components/common/Loader"
import { Paper } from "@mui/material";

export default function AddMufthiAndStudent() {
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [status, setStatus] = useState([
    { id: 1, title: "Active" },
    { id: 2, title: "Inactive" },
  ]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userToken, setUserToken] = useState([]);

  const [isLoading, setLoader] = useState(false);
  const roles = [
    { label: "Mufthi", value: "mufti" },
    { label: "Students", value: "students" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    getmadhabApi();
  }, []);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("@darul-ifta-user-login-details")
    );
    if (user) setUserToken(user.initial_token);
  }, []);

  const getmadhabApi = () => {
    setLoader(true);
    axios
      .get(URLS.madhab)
      .then((res) => {
        setLoader(false);
        setMadhabData(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error madhab", err);
        setMadhabData([]);
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
    setLoader(true);
    let payload = {
      email: email,
      name: name,
      display_title: displayName,
      phone: mobileNumber,
      user_type: selectedRoles.label,
      madhab: selectedMadhab.title,
      address: address,
      user_password: password,
      user_status: selectedStatus.title,
    };

    console.log("payload====>", payload);

    axios
      .post(`${URLS.user}${URLS.signup}`, payload, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res user save ===>>", res);
        if (res?.success) {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
            },
          });
          navigate(-1);
        } else {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
            },
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        toast("Somthing went wrong, please try again later", {
          onClose: () => {
            setLoader(false);
          },
        });
        console.log("Errors in user save", err);
      });
  };
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <Paper elevation={2}>
          <div className="add-user-section  bg-white">
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="add-user-container">
                <div className="add-user-row">
                  <div className="col-md-6 first-col">
                    <TextField
                      id="userAddName"
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
                      id="userAddDisplayName"
                      label="Display Name"
                      size="small"
                      fullWidth
                      variant="outlined"
                      {...register("displayName", {
                        required: "Display Name is required",
                      })}
                    />
                    <div className="error">{errors?.displayName?.message}</div>
                  </div>
                </div>
                <div className="add-user-row">
                  <div className="col-md-6 first-col">
                    <TextField
                      id="userAddEmail"
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
                      id="userAddMobileNumber"
                      label="Whatsapp Number"
                      size="small"
                      type="number"
                      fullWidth
                      variant="outlined"
                      // {...register("mobileNumber", {
                      //   required: "Mobile Number is required",
                      // })}
                      {...register("mobileNumber", {
                        required: "Please enter Mobile Number",
                        minLength: {
                          value: 10,
                          message: "Mobile Number length must be 10 digit. ",
                        },
                        maxLength: {
                          value: 10,
                          message: "Mobile Number length must be 10 digit. ",
                        },
                      })}
                    />
                    <div className="error">{errors?.mobileNumber?.message}</div>
                  </div>
                </div>
                <div className="add-user-row">
                  <div className="col-md-6 first-col">
                    <TextField
                      id="userAddPassword"
                      label="Password"
                      type="password"
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
                    <Autocomplete
                      disablePortal
                      id="userAddRoles"
                      size="small"
                      options={roles}
                      getOptionLabel={(option) => option.label || ""}
                      isOptionEqualToValue={(option, value) => {
                        return option.label === value.label;
                      }}
                      onChange={(e, val) => setSelectedRoles(val)}
                      value={selectedRoles || null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Roles"
                          {...register("roles", {
                            required: "Roles is required",
                          })}
                        />
                      )}
                    />
                    {!selectedRoles?.label && (
                      <div className="error">{errors?.roles?.message}</div>
                    )}
                  </div>
                  <div className="col-md-3 second-col">
                    <Autocomplete
                      disablePortal
                      id="userAddMadhab"
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
                          label="Madhab"
                          {...register("madhab", {
                            required: "Madhab is required",
                          })}
                        />
                      )}
                    />

                    {!selectedMadhab?.title && (
                      <div className="error">{errors?.madhab?.message}</div>
                    )}
                  </div>
                </div>
                <div className="add-user-row">
                  <div className="col-md-6 first-col">
                    <TextField
                      id="userAddAddress"
                      label="Address"
                      // size="small"
                      rows={3}
                      multiline
                      fullWidth
                      variant="outlined"
                      {...register("address", {
                        required: "Address is required",
                      })}
                    />
                    <div className="error">{errors?.address?.message}</div>
                  </div>
                  <div className="col-md-6 second-col">
                    {status?.length && (
                      <Autocomplete
                        disablePortal
                        id="userAddStatus"
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
                            label="Active Status"
                            {...register("status", {
                              required: "Status is required",
                            })}
                          />
                        )}
                      />
                    )}
                    {!selectedStatus?.title && (
                      <div className="error">{errors?.status?.message}</div>
                    )}
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
        </Paper>
      )}
    </>
  );
}
