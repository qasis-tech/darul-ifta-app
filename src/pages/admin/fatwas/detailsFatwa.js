import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FatwaAddComponent from "../../../components/FatwaAddComponent";
import "./fatwas.details.styles.scss";
const options = ["Option 1", "Option 2"];

export default function FatwasDetails() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="fatwas-details-section">
      <div className="fatwas-details-container">
        <div className="fatwas-details-row">
          <div className="col-md-4 first-col">
            <Autocomplete
              size="small"
              value={value}
              fullWidth
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </div>
          <div className="col-md-4">
            <Autocomplete
              size="small"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              fullWidth
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => <TextField {...params} label="Madhab" />}
            />
          </div>
          <div className="col-md-4 second-col">
            <Autocomplete
              size="small"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Language" />
              )}
            />
          </div>
        </div>
        <div className="qshort-section">
          <div className="qshort-container">
            <div className="qshort-row">
              <div className="col-md-12">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Short Question"
                  multiline
                  fullWidth
                  maxRows={4}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="qshort-section">
          <div className="qshort-container">
            <div className="qshort-row">
              <div className="col-md-12">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Long Question"
                  multiline
                  fullWidth
                  rows={4}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fatwas-details-row written-section">
          <div className="col-md-6 first-col">
            <Autocomplete
              size="small"
              value={value}
              fullWidth
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Written By" />
              )}
            />
          </div>
          <div className="col-md-6">
            <Autocomplete
              size="small"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              fullWidth
              id="controllable-states-demo"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Verified By" />
              )}
            />
          </div>
        </div>
        <div className="qshort-section">
          <div className="qshort-container">
            <div className="qshort-row">
              <div className="col-md-12">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Fatwa"
                  multiline
                  fullWidth
                  rows={6}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <FatwaAddComponent />
        <div className="btn-section">
          <div className="col-md-1">
            <Button variant="contained" className="form-btn" fullWidth>
              PUBLISH
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
