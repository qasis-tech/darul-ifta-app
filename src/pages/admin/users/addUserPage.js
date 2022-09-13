import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./adduser.styles.scss";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function AddUser() {
  return (
    <div className="add-user-section">
      <div className="add-user-container">
        <div className="add-user-row">
          <div className="col-md-6 first-col">
            <TextField
              id="outlined-basic"
              label="Name"
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
          </div>
          <div className="col-md-6 second-col">
            <TextField
              id="outlined-basic"
              label="Whatsapp Number"
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
              label="Password"
              size="small"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="col-md-3 second-col">
            <Autocomplete
              disablePortal
              size="small"
              fullWidth
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Roles" />}
            />
          </div>
          <div className="col-md-3 second-col">
            <Autocomplete
              disablePortal
              size="small"
              fullWidth
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Madhab" />}
            />
          </div>
        </div>
        <div className="add-user-row">
          <div className="col-md-6 first-col">
            <TextField
              id="outlined-basic"
              label="Address"
              size="small"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="col-md-6 second-col">
            <Autocomplete
              disablePortal
              size="small"
              fullWidth
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Active Status" />
              )}
            />
          </div>
        </div>
        <div className="btn-section">
          <div className="col-md-1">
            <Button variant="contained" className="form-btn">
              <ArrowBackIcon />
            </Button>
          </div>
          <div className="col-md-1">
            <Button variant="contained" className="form-btn" fullWidth>
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
