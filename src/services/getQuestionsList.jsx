import axios from "axios";
import { URLS } from "../config/urls.config";

const getQuestionListApi = (params = "") => {
  return axios
    .get(`${URLS.question}${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((err) => err);
};

export default getQuestionListApi;
