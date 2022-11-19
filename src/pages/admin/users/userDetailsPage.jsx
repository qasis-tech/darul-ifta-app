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
import "./adduser.styles.scss";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";

// const profileSchema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   madhab: yup.string().required("Madhab is required"),
//   address: yup.string().required("Address is required"),
//   email: yup.string().required("Email is required"),
//   displayName: yup.string().required("Display Name is required"),
//   password: yup.string().required("Password is required"),
//   status: yup.string().required("Status is required"),
//   mobileNumber: yup
//     .string()
//     .phone("IN", true, "Mobile Number is invalid")
//     .required(),
// });

export default function UserDetails() {
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [status, setStatus] = useState([
    { id: 1, title: "Active" },
    { id: 2, title: "Inactive" },
  ]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [userToken, setUserToken] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });

  const roles = [
    { label: "Mufthi", value: "mufti" },
    { label: "Student", value: "student" },
    { label: "User", value: "user" },
  ];
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    getmadhabApi();
    getUserApi();
  }, []);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("@darul-ifta-user-login-details")
    );
    console.log("user", user);
    if (user) {
      setUserToken(user.initial_token);
    }
  }, []);

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
    navigate(-1);
  };

  const getmadhabApi = () => {
    setLoader(true);
    axios
      .get(URLS.madhab, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("res madhabb1111==>", res.data);
        setMadhabData(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error madhab", err);
        setMadhabData([]);
      });
  };
  const handleUserDetails = (val, field) => {
    const temp = { ...userDetails };
    temp[`${field}`] = val;
    setUserDetails(temp);
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
      user_type: roles,
      madhab: selectedMadhab.title,
      address: address,
      user_password: password,
      user_status: selectedStatus.title,
    };

    axios
      .put(`${URLS.user}${URLS.signup}`, payload, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("res user save ===>>", res);
        if (res?.success) {
          setError({
            visible: true,
            message: res.message,
            type: "success",
            title: "Success",
          });
        } else {
          setError({
            visible: true,
            message: res.message,
            type: "warning",
            title: "Warning",
          });
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("Errors in user save", err);
      });
  };
  const getUserApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}/${id}`)
      .then(({ data }) => {
        console.log("555555555==>",data)
        setLoader(false);
        setUserData(data);
        setValue("address",data?.address)
        setValue("name",data?.name)
        setValue("displayName",data?.display_title)
        setValue("email",data?.email)
        setValue("mobileNumber",data?.phone)
        setValue("status",data?.user_status)
        setValue("roles",data?.user_type)
        setSelectedMadhab(data?.madhab);
        let index=madhabData.findIndex(value=>{console.log("11111111111",value.titile,data?.madhab)})
        console.log("indexx=>",index)
        setValue("madhab",data.madhab)
        
      })
      .catch((err) => {
        setLoader(false);
        console.log("error userr--", err);
        setUserData([]);
      });
  };

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <div className="add-user-section shadow bg-white">
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
                      required: "Display Name is required",
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
                      required: "Mobile Number is required",
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
                    // disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={roles}
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    onChange={(e, val) => {
                      console.log("E,VAL", e, val);
                      setSelectedRoles(val);
                    }}
                    value={selectedRoles}
                    // {...register("roles", {
                    //   required: "Madhab is required",
                    // })}
                    renderInput={(params) => (
                      <TextField {...params} label="Roles" />
                    )}
                  />
                </div>
                <div className="col-md-3 second-col">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={madhabData}
                    getOptionLabel={(option) => option.title || ""}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) =>{ setSelectedMadhab(val);console.log("valueee==>",val)}}
                  
                    value={selectedMadhab}
                    // {...register("madhab", {
                    //   required: "Madhab is required",
                    // })}
                    renderInput={(params) => (
                      <TextField {...params} label="Madhab" />
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
                    id="outlined-basic"
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
                          // {...register("status", {
                          //   required: "Status is required",
                          // })}
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
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {errorPopup.visible && (
            <SnackBar
              visible={errorPopup.visible}
              message={errorPopup.message}
              type={errorPopup.type}
              title={errorPopup.title}
              onClose={() => handleCloseError()}
            />
          )}
        </div>
      )}
    </>
  );
}
