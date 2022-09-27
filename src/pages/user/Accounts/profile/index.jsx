import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";

import "./profile.styles.scss";

import { getLocal } from "../../../../utils/localStore";
import getmadhabList from "../../../../services/getMadhabList";
import { Autocomplete } from "@mui/material";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [madbahList, setMadbahList] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const getLocalUserDetails = async () => {
    let localData = await getLocal();
    setUserDetails(localData);
  };

  useEffect(() => {
    getLocalUserDetails();
    getmadhabList((res) => {
      console.log("madhab ==== >", res);
      setMadbahList(res);
    });
  }, []);

  console.log("userDetails", userDetails);
  const handleUserDetails = (val, field) => {
    const temp = { ...userDetails };
    temp[`${field}`] = val;
    setUserDetails(temp);
  };

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="row">
          <div className="col-md-6">
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
            <Autocomplete
              id="outlined-basic"
              size="small"
              options={madbahList}
              getOptionLabel={(option) => option.title || ""}
              isOptionEqualToValue={(option, value) => option._id === value._id}
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
      </div>
    </div>
  );
}
