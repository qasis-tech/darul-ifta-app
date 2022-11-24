import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { Autocomplete, Button, TextField } from "@mui/material";

import getmadhabList from "../../../../services/getMadhabList";

import { URLS } from "../../../../config/urls.config";
import SnackBar from "../../../../components/common/Snackbar";
import Loader from "../../../../components/common/Loader";
import { addUserLoginDetails } from "../../../../redux/actions";
import { StoreLocal } from "../../../../utils/localStore";

import "./profile.styles.scss";

const Profile = ({ closePopup, userLoginDetails, addUserLoginDetails }) => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [madbahList, setMadbahList] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
    getValues,
  } = useForm({ defaultValues: { madhab: "" } });
  console.log("Errors:", errors.madhab);
  useEffect(() => {
    setUserDetails(userLoginDetails);
    getmadhabList().then((res) => {
      setMadbahList(res);
      let index = res.findIndex((fl) => fl.title === userLoginDetails?.madhab);
      if (index !== -1) {
        setValue("madhab", res[index]);
      }
    });
    setValue("name", userLoginDetails?.name);
    setValue("mobileNumber", userLoginDetails?.phone);
    setValue("address", userLoginDetails?.address);
  }, []);

  const handleUserDetails = (val, field) => {
    const temp = { ...userDetails };
    temp[`${field}`] = val;
    setUserDetails(temp);
  };

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
    navigate(0);
  };

  const handleUserUpdate = ({ mobileNumber, address, name, madhab }) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("phone", mobileNumber);
    formData.append("address", address);
    formData.append("name", name);
    formData.append("user_type", userLoginDetails?.user_type);
    formData.append("user_status", userLoginDetails?.user_status);
    formData.append("madhab", madhab?.title);

    axios
      .put(`${URLS.user}${URLS.signup}/${userLoginDetails._id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
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
        StoreLocal("@darul-ifta-user-login-details", res.data, () => {
          addUserLoginDetails(res.data);
          setLoader(false);
        });
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error in profile edit", err);
      });
  };

  return (
    <div>
      {isLoading ? (
        <Loader skeleton />
      ) : (
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
                    {...register("name", {
                      required: "Name is required",
                      onChange: (e) =>
                        handleUserDetails(e.target.value, "name"),
                    })}
                  />
                  <div className="error">{errors?.name?.message}</div>
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
                    id="outlined-basic"
                    label="Mobile Number"
                    size="small"
                    variant="outlined"
                    fullWidth
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
                      onChange: (e) =>
                        handleUserDetails(e.target.value, "phone"),
                    })}
                  />

                  <div className="error">{errors?.mobileNumber?.message}</div>
                </div>
                <div className="col-md-6">
                  <Controller
                    control={control}
                    name="madhab"
                    rules={{ required: true, message: "madhab is required" }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        id="outlined-basic"
                        size="small"
                        options={madbahList}
                        getOptionLabel={(option) => option.title || ""}
                        isOptionEqualToValue={(option, value) =>
                          option._id === value._id
                        }
                        value={value}
                        onChange={(e, val) => onChange(val)}
                        renderInput={(params) => (
                          <TextField {...params} label="Madhab" />
                        )}
                      />
                    )}
                  />
                  {errors.madhab && (
                    <div className="error">madhab is required</div>
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
                    {...register("address", {
                      required: "Address is required",
                      onChange: (e) =>
                        handleUserDetails(e.target.value, "address"),
                    })}
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
      )}
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
};

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  addUserLoginDetails: (payload) => dispatch(addUserLoginDetails(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
