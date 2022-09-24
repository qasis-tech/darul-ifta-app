import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { URLS } from "../../../../config/urls.config";
import { TextField, Autocomplete, Button } from "@mui/material";

import "./askfatwas.styles.scss";

export default function AskFatwasComponent() {
  const [madhabList, setMadhabList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [madhabData, setMadhabData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCatgoryApi();
    getmadhabApi();
  }, []);

  const getCatgoryApi = () => {
    axios
      .get(URLS.category, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res category11===>>", res.data.data);
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };

  const getmadhabApi = () => {
    axios
      .get(URLS.madhab, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res mathab===>>.", res.data.data);
        setMadhabData(res.data.data);
      })
      .catch((err) => {
        console.log("error madhab", err);
      });
  };

  const handleSubmitQuestion = (data) => {
    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitQuestion)}>
      <div className="form-section">
        <div className="form-container">
          <div className="row">
            <div className="col-md-4">
              <Autocomplete
                id="outlined-basic"
                size="small"
                options={madhabList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="
                  Madhab"
                    {...register("madhab", { required: "This is required" })}
                  />
                )}
              />

              <div className="error">{errors?.madhab?.message}</div>
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
                    {...register("category", {
                      required: "This is required",
                    })}
                  />
                )}
              />

              <div className="error">{errors?.category?.message}</div>
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
                    {...register("language", { required: "This is required" })}
                  />
                )}
              />
              <div className="error">{errors?.language?.message}</div>
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
                {...register("shortQuestion", { required: "This is required" })}
              />
              <div className="error">{errors?.shortQuestion?.message}</div>
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
                {...register("question", { required: "This is required" })}
              />
              <div className="error">{errors?.question?.message}</div>
            </div>
          </div>
          <div className="row">
            <div className=" btn-section">
              <Button type="submit" className="submit-btn" variant="contained">
                Submit Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
