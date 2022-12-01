import React, { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
// import "./adduser.styles.scss";

import {URLS} from "../../../config/urls.config"
import Loader from "../../../components/common/Loader"
import { Container, Grid, Paper } from "@mui/material";
import { toast } from "react-toastify";
import routerList from "../../../routes/routerList"

export default function MufthiAndStudentDetails() {
  const navigate = useNavigate();

  const [madhabData, setMadhabData] = useState([]);
  const [userToken, setUserToken] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const roles = [
    { label: "Mufthi", value: "mufti" },
    { label: "Students", value: "students" },
  ];
  const status = [
    { id: 1, title: "Active" },
    { id: 2, title: "Inactive" },
  ];

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    getmadhabApi();
  }, []);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("@darul-ifta-user-login-details")
    );

    if (user) {
      setUserToken(user.initial_token);
    }
  }, []);

  const getmadhabApi = () => {
    setLoader(true);
    axios
      .get(URLS.madhab)
      .then((res) => {
        setLoader(false);
        setMadhabData(res.data);
        getUserApi(res.data);
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
    madhab,
    roles,
    status,
  }) => {
    // setLoader(true);

    let payload = {
      email: email,
      name: name,
      display_title: displayName,
      phone: mobileNumber,
      user_type: roles.label,
      madhab: madhab.title,
      address: address,
      user_password: password,
      user_status: status.title,
      password,
    };

    console.log("1111 22222", payload);
    axios
      .put(`${URLS.user}${URLS.signup}/${id}`, payload, {
        headers: {
          Authorization: `${userToken}`,
        },
      })
      .then((res) => {
        setLoader(false);
        if (res?.success) {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
              navigate(`${routerList.admin.admin}/${routerList.admin.mufthiAndStudent}`);
            },
          });
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

  const getUserApi = (madhabList) => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}/${id}`)
      .then(({ data }) => {
        setLoader(false);
        setUserData(data);
        setValue("address", data?.address);
        setValue("name", data?.name);
        setValue("displayName", data?.display_title);
        setValue("email", data?.email);
        setValue("mobileNumber", data?.phone);

        let indexRoles = roles.findIndex(
          (value) => value.label === data.user_type
        );
        if (indexRoles !== -1) setValue("roles", roles[indexRoles]);

        let index = madhabList.findIndex(
          (value) => value.title === data?.madhab
        );
        if (index !== -1) setValue("madhab", madhabList[index]);

        let indexStatus = status?.findIndex(
          (value) => value.title === data?.user_status
        );
        if (indexStatus !== -1) setValue("status", status[indexStatus]);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error userr--", err);
        toast(err?.message);
        setUserData([]);
      });
  };

  return (
    <Container>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <Paper elevation={2} className="add-user-section  bg-white">
          <form onSubmit={handleSubmit(handleSave)}>
            <Grid container rowSpacing={3} columnSpacing={4}>
              <Grid item md={6}>
                <TextField
                  id="outlined-basic"
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
                  id="outlined-basic"
                  label="Display Name"
                  size="small"
                  fullWidth
                  variant="outlined"
                  {...register("displayName", {
                    required: "Display Name is required",
                  })}
                />
                <div className="error">{errors?.displayName?.message}</div>
              </Grid>
              <Grid item md={6}>
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
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="outlined-basic"
                  label="Whatsapp Number"
                  size="small"
                  fullWidth
                  variant="outlined"
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                  })}
                />
                <div className="error">{errors?.mobileNumber?.message}</div>
              </Grid>
              <Grid item md={6}>
                <Controller
                  control={control}
                  name="roles"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="userDetailsRoles"
                      size="small"
                      options={roles}
                      getOptionLabel={(option) => option.label || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.label === value.label
                      }
                      value={value}
                      onChange={(e, val) => onChange(val)}
                      renderInput={(params) => (
                        <TextField {...params} label="Roles" />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  control={control}
                  name="madhab"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      disablePortal
                      id="userMadhabList"
                      size="small"
                      options={madhabData}
                      getOptionLabel={(option) => option.title || ""}
                      isOptionEqualToValue={(option, value) =>
                        option._id === value._id
                      }
                      onChange={(e, val) => onChange(val)}
                      value={value}
                      renderInput={(params) => (
                        <TextField {...params} label="Madhab" />
                      )}
                    />
                  )}
                />

                {errors?.madhab && (
                  <div className="error">Madhab is required</div>
                )}
              </Grid>

              <Grid item md={6}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  rows={3}
                  multiline
                  fullWidth
                  variant="outlined"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors?.address && (
                  <div className="error">{errors?.address?.message}</div>
                )}
              </Grid>

              <Grid item md={6}>
                <Controller
                  control={control}
                  name="status"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      disablePortal
                      id="userStatus"
                      size="small"
                      options={status}
                      getOptionLabel={(option) => option.title || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      value={value}
                      onChange={(e, val) => onChange(val)}
                      renderInput={(params) => (
                        <TextField {...params} label="Active Status" />
                      )}
                    />
                  )}
                />

                {errors?.status && (
                  <div className="error">Status is required</div>
                )}
              </Grid>
            </Grid>
            <Grid container md={12} justifyContent="end">
              <Button variant="contained" className="form-btn" type="submit">
                Update
              </Button>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
}
