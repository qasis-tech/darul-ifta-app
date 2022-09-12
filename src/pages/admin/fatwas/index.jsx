import React from "react";
import TextField from "@mui/material/TextField";

export default function Fatwas() {
  return (
    <div className="admin-fatwas-section">
      <div className="fatwas-container">
        <div className="fatwas-row">
          <div className="col-md-3">
            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Name"
              variant="outlined"
            />
          </div>
          <div className="col-md-3">
            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Name"
              variant="outlined"
            />
          </div>
          <div className="col-md-3">
            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Name"
              variant="outlined"
            />
          </div>
          <div className="col-md-3">
            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Name"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
