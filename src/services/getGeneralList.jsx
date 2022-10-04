import axios from "axios";
import { URLS } from "../config/urls.config";

export default function getGeneralsListApi(cb) {
  axios
    .get(URLS.generals, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      cb(res?.data?.data, null);
    })
    .catch((err) => {
      console.log("error generals", err);
      cb(null, err);
    });
}
