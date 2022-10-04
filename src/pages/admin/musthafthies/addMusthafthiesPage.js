import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./addMusthafthies.styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function AddMusthafthies() {
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [roles, setRoles] = useState("Mufthi");
  const [userToken, setUserToken] = useState([]);
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getmadhabApi();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("@darul-ifta-login-details"));
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
      });
  };

  const handleSave = ({ name, email, mobileNumber, password, address }) => {
    let payload = {
      email: email,
      name: name,
      phone: mobileNumber,
      user_type: roles,
      madhab: selectedMadhab.title,
      address: address,
      user_password: password,
    };
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
        console.log("Errors in user save", err);
      });
  };
  const navigate = useNavigate();

  return (
    <div className="add-musthafthies-section">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="add-musthafthies-container">
          <div className="col-md-12">
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
          <div className="add-musthafthies-row">
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
          <div className="add-musthafthies-row">
            <div className="col-md-6 first-col">
              <TextField
                id="outlined-basic"
                type="password"
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
              <TextField
                id="outlined-basic"
                label="Roles"
                size="small"
                fullWidth
                variant="outlined"
                defaultValue="Mufthi"
              />
            </div>
            <div className="col-md-3 second-col">
              {madhabData?.length ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  fullWidth
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
          <div className="col-md-12 address">
            <TextField
              id="outlined-textarea"
              label="Address"
              placeholder="Placeholder"
              fullWidth
              rows={3}
              multiline
              {...register("address", { required: "Address is required" })}
            />
            <div className="error">{errors?.address?.message}</div>
          </div>
          <div className="btn-section">
            {isLoader ? (
              <Loader />
            ) : (
              <div className="col-md-1">
                <Button
                  type="submit"
                  variant="contained"
                  className="form-btn"
                  fullWidth
                >
                  SAVE
                </Button>
              </div>
            )}
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
  );
}
