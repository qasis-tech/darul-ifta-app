import * as React from "react";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import "../styles/fatwa.add.styles.scss";
export default function FatwaAddComponent() {
return(
    <div className="show-section">
    <div className="show-container">
      <div className="show-row">
        <div className="col-md-4">
          <div className="heading">
            <h5>Show</h5>
          </div>
        </div>
        <div className="col-md-4 add-button">
          <Button variant="contained">
            {" "}
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
    <div className="show-table-container">
      <div className="col-md-10">
        <div className="show-table-row">
          <div className="col-md-12">
            <TextField
              id="outlined-multiline-flexible"
              label="Short Question"
              size="small"
              fullWidth
            />
          </div>
          <div className="second-row">
            <div className="col-md-4 first-col">
              <TextField
                id="outlined-multiline-flexible"
                label="Short Question"
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-4">
              <TextField
                id="outlined-multiline-flexible"
                label="Short Question"
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-4 second-col">
              <TextField
                id="outlined-multiline-flexible"
                label="Short Question"
                size="small"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2 close-section">
        <div className="close-button">
          <CloseIcon />
        </div>
      </div>
    </div>
    <hr />
  </div>
);
}