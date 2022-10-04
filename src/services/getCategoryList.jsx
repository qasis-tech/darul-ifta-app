import axios from "axios";
import { URLS } from "../config/urls.config";

export default function getCategoryListApi() {
  return axios
    .get(URLS.category, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((err) => err);
}
