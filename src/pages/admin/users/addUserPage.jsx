import React, { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import COL from "country-codes-list";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "yup-phone";
import "./adduser.styles.scss";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import { Container, Grid, Paper } from "@mui/material";

export default function AddUser() {
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [status, setStatus] = useState([
    { id: 1, title: "Active" },
    { id: 2, title: "Inactive" },
  ]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userToken, setUserToken] = useState([]);

  const [isLoading, setLoader] = useState(false);
  const roles = [{ label: "User", value: "user" }];
  const [country, setCountry] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    getmadhabApi();
    setCountry(COL.all());
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
          <div>
            <form onSubmit={handleSubmit(handleSave)} style={{ padding: 15 }}>
              <Container sx={{ p: 1 }}>
                <Grid container spacing={4}>
                  <Grid item md={6}>
                    <TextField
                      id="userAddName"
                      label="Name"
                      size="small"
                      fullWidth
                      variant="outlined"
                      {...register("name", { required: "Name is required" })}
                    />
                    <div className="error">{errors?.name?.message}</div>
                  </Grid>
                  <Grid item md={6}>
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
                  </Grid>
                  <Grid item md={6}>
                    <Controller
                      control={control}
                      name="country"
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          disablePortal
                          id="userCountry"
                          size="small"
                          options={country}
                          getOptionLabel={(option) =>
                            option.countryNameEn || ""
                          }
                          isOptionEqualToValue={(option, value) => {
                            return option.label === value.label;
                          }}
                          onChange={(e, val) => onChange(val)}
                          value={value}
                          renderInput={(params) => (
                            <TextField {...params} label="Country" />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  {country?.errors && (
                    <div className="error">Country is required</div>
                  )}
                  <Grid item md={6}>
                    <TextField
                      id="userWhatsappeNumber"
                      label="Whatsapp Number"
                      size="small"
                      type="number"
                      fullWidth
                      variant="outlined"
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
                  </Grid>
                  <Grid item md={6}>
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
                  </Grid>
                  <Grid item md={6}>
                    <Controller
                      control={control}
                      name="madhab"
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          disablePortal
                          id="userAddMadhab"
                          size="small"
                          options={madhabData}
                          getOptionLabel={(option) => option.title || ""}
                          isOptionEqualToValue={(option, value) =>
                            option?._id === value?._id
                          }
                          onChange={(e, val) => onChange(val)}
                          value={value}
                          renderInput={(params) => (
                            <TextField {...params} label="Madhab" />
                          )}
                        />
                      )}
                    />

                    {!selectedMadhab?.title && (
                      <div className="error">{errors?.madhab?.message}</div>
                    )}
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      id="userAddAddress"
                      label="Address"
                      rows={3}
                      multiline
                      fullWidth
                      variant="outlined"
                      {...register("address", {
                        required: "Address is required",
                      })}
                    />
                    <div className="error">{errors?.address?.message}</div>
                  </Grid>
                </Grid>
              </Container>

              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    className="form-btn"
                    type="submit"
                    fullWidth
                  >
                    Save Profile
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      )}
    </>
  );
}
