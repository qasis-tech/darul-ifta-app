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

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";


export default function AdminProfile() {
 
  return (
    <>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <div className="add-user-section shadow bg-white">
          <form>
            <div className="add-user-container">
              <div className="add-user-row">
                <div className="col-md-6 first-col">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <div className="col-md-6 second-col">
                  <TextField
                    id="outlined-basic"
                    label="Display Name"
                    size="small"
                    fullWidth
                    variant="outlined"
                  />
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
                  />
                  <div className="error">{errors?.email?.message}</div>
                </div>
                <div className="col-md-6 second-col">
                  <TextField
                    id="outlined-basic"
                    label="Whatsapp Number"
                    size="small"
                    fullWidth
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
                    onChange={(e, val) => {
                      setSelectedMadhab(val);
                      console.log("valueee==>", val);
                    }}
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
                          label="Active Status"
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
