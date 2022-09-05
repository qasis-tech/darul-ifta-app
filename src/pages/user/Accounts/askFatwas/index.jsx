import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';

import "./askfatwas.styles.scss";
export default function AskFatwasComponent() {
  return (
    <div className="form-section">
      <div className="form-container">
        <div className="row">
          <div className="col-md-4">
            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Madhab"
              variant="outlined"
            />
          </div>
          <div className="col-md-4">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
              Category"
                />
              )}
            />
          </div>
          <div className="col-md-4">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
              Language"
                />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Short Question"
              variant="outlined"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TextField
              id="outlined-multiline-static"
              label="Question "
              multiline
              fullWidth
              rows={4}
            />
          </div>
        </div>
        <div className="row">
            <div className=" btn-section">
            <Button className="submit-btn" variant="contained">Submit Question</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
