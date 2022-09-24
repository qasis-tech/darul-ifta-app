import React, { useState, useEffect } from "react";

import { TextField, Autocomplete, Button } from "@mui/material";

import "./askfatwas.styles.scss";

export default function AskFatwasComponent() {
  const [madhabList, setMadhabList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="form-section">
      <div className="form-container">
        <div className="row">
          <div className="col-md-4">
            {/* <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              label="Madhab"
              variant="outlined"
            /> */}

            <Autocomplete
              id="outlined-basic"
              size="small"
              options={madhabList}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="
                  Madhab"
                />
              )}
            />
          </div>
          <div className="col-md-4">
            <Autocomplete
              id="combo-box-demo"
              size="small"
              options={categoryList}
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
              id="combo-box-demo"
              size="small"
              options={languageList}
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
            <Button className="submit-btn" variant="contained">
              Submit Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
