import React, { useEffect, useState } from "react";

import { Autocomplete, Button, TextField } from "@mui/material";

import "./profile.styles.scss";

import { getLocal } from "../../../../utils/localStore";
import getmadhabList from "../../../../services/getMadhabList";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [madbahList, setMadbahList] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);

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

  return (
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
            />
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
                    // {...register("madhab", { required: "This is required" })}
                  />
                )}
              />
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
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="btn-section d-flex justify-content-center">
            <Button type="submit" className="submit-btn" variant="contained">
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
