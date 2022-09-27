import axios from "axios";
import { URLS } from "../config/urls.config";

const getmadhabList = (cb) => {
  axios
    .get(URLS.madhab, {
      headers: {
        // Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      cb(res.data.data);
    })
    .catch((err) => {
      console.log("error madhab", err);
      return [];
    });
};

export default getmadhabList;
