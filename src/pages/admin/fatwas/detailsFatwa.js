import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import FatwaAddComponent from "../../../components/FatwaAddComponent";
import getQuestionListApi from "../../../services/getQuestionsList";
import "./fatwas.details.styles.scss";
import { useParams, useLocation } from "react-router-dom";

import getCategoryListApi from "../../../services/getCategoryList";
const options = ["Option 1", "Option 2"];

export default function FatwasDetails() {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [questionList, setQuestionList] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const { id } = useParams();

  const location = useLocation();
  console.log("location =========== ", location);

  useEffect(() => {
    getQuestions(`/${id}`);
    getCategory();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getQuestions = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        console.log("res fatwa detail page ", res);
        setQuestionList(res);
        setLoader(false);
      })
      .catch((err) => {
        console.log("Errr in get QUestion API", err);
        setQuestionList([]);
      });
  };
  const getCategory = () => {
    setLoader(true);
    getCategoryListApi()
      .then((res) => {
        console.log("res Category ", res);
        setCategoryData(res);
        setLoader(false);
      })
      .catch((err) => {
        console.log("Errr in get Category API", err);
        setCategoryData([]);
        setLoader(false);
      });
  };
  return (
    <div className="fatwas-details-section">
      <div className="fatwa-print-section">
        <div className="col-md-6">
          <h6>
            <span className="id-style"> Q-ID</span>
            <span>
              &nbsp;: 553 - KAUZARIYYA : <span>Published</span>
            </span>
          </h6>
        </div>
        <div className="col-md-6 printer">
          <Button variant="contained" className="form-btn">
            <PrintIcon />
          </Button>
        </div>
      </div>
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
                <TextField {...params} label="Subcategory" />
              )}
            />
          </div>
          <div className="col-md-2">
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
          <div className="col-md-2 second-col">
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
