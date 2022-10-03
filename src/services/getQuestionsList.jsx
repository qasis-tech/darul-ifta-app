import axios from "axios";
import { useState } from "react";
import { URLS } from "../config/urls.config";

const getQuestionListApi = (cb) => {
  axios
    .get(URLS.question, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("res question ===>> ", res);
      cb(res.data);
    })
    .catch((err) => {
      console.log("error question", err);
      cb(err);
    });
};

export default getQuestionListApi;
