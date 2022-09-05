import * as React from 'react';
import TextField from "@mui/material/TextField";
import "./profile.styles.scss";
export default function Profile() {
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
            />
          </div>
          <div className="col-md-6">
          <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Email"
              variant="outlined"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
          <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Mobile Number"
              variant="outlined"
            />
          </div>
          <div className="col-md-6">
          <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="User Status"
              variant="outlined"
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
