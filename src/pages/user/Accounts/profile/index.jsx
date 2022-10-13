import React, { useEffect, useState } from "react";

import { Autocomplete, Button, TextField } from "@mui/material";

import "./profile.styles.scss";

import { getLocal } from "../../../../utils/localStore";
import getmadhabList from "../../../../services/getMadhabList";
import { useForm } from "react-hook-form";
import { URLS } from "../../../../config/urls.config";
import axios from "axios";
import SnackBar from "../../../../components/common/Snackbar";
import { useNavigate } from "react-router-dom";
import routerList from "../../../../routes/routerList";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [madbahList, setMadbahList] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
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
    getLocal().then((res) => setUserDetails(res));
    getmadhabList().then((res) => setMadbahList(res));
  }, []);

  const handleUserDetails = (val, field) => {
    const temp = { ...userDetails };
    temp[`${field}`] = val;
    setUserDetails(temp);
  };

  console.log("userDetails==>", userDetails);

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
    // navigate(-1);
  };

  const handleUserUpdate = ({ mobileNumber, madhab, address }) => {
    const formData = new FormData();
    formData.append("phone", mobileNumber);
    formData.append("madhab", madhab);
    formData.append("address", address);
    formData.append("name", userDetails.name);
    formData.append("user_type", userDetails.user_type);
    formData.append("user_status", userDetails.user_status);

    axios
      .put(`${URLS.user}${URLS.signup}/${userDetails._id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res profile edit puttt==>", res);
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
        console.error("Error in profile edit", err);
      });
  };

  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={handleSubmit(handleUserUpdate)}>
        <div className="profile-section">
          <div className="profile-container">
            <div className="row">
              <div className="col-md-6 ">
                <TextField
                  id="outlined-basic"
                  size="small"
                  fullWidth
                  label="Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: userDetails?.name }}
                  value={userDetails?.name || ""}
                  onChange={(e) => handleUserDetails(e.target.value, "name")}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="outlined-basic"
                  size="small"
                  fullWidth
                  label="Email"
                  variant="outlined"
                  InputLabelProps={{ shrink: userDetails?.email }}
                  value={userDetails?.email}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="phone"
                  type="number"
                  label="Mobile Number"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleUserDetails(e.target.value, "phone")}
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                    pattern: {
                      value:
                        /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
                      message: "Invalid mobile number",
                    },
                  })}
                />
                <div className="error">{errors?.mobileNumber?.message}</div>
              </div>
              <div className="col-md-6">
                {!!madbahList?.length && (
                  <Autocomplete
                    id="outlined-basic"
                    size="small"
                    options={madbahList}
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
                )}
                {!selectedMadhab?.title && (
                  <div className="error">{errors?.madhab?.message}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <TextField
                  id="outlined-multiline-static"
                  label="Address "
                  multiline
                  fullWidth
                  rows={4}
                  {...register("address", { required: "Address is required" })}
                />
                <div className="error">{errors?.address?.message}</div>
              </div>
            </div>
            <div className="row my-3">
              <div className="btn-section d-flex justify-content-center">
                <Button
                  type="submit"
                  className="submit-btn"
                  variant="contained"
                >
                  Update Profile
                </Button>
              </div>
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
  );
}
