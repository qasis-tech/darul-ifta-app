import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./addMusthafthies.styles.scss";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function AddMusthafthies() {
  return (
    <div className="add-musthafthies-section">
      <div className="add-musthafthies-container">
        <div className="col-md-12">
          <TextField
            id="outlined-basic"
            label="Name"
            size="small"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="add-musthafthies-row">
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
        <div className="add-musthafthies-row">
          <div className="col-md-6 first-col">
            <TextField
              id="outlined-basic"
              label="Password"
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
              renderInput={(params) => <TextField {...params} label="Madhab" />}
            />
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
          />
        </div>
        <div className="btn-section">
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
