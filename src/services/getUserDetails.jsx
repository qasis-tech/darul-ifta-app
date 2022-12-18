import axios from "axios";
import { URLS } from "../config/urls.config";

export default function getUserDetailsApi(params) {
  return axios
    .get(`${URLS.user}${URLS.signup}${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((err) => err);
}
