import axios from "axios";
import { URLS } from "../config/urls.config";

export default function getGeneralsListApi() {
  return axios
    .get(URLS.generals, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((err) => err);
}
