import axios from "axios";
import { URLS } from "../config/urls.config";

export default function getSubCategoryListApi() {
  return axios
    .get(URLS.subcategory, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res?.data)
    .catch((err) => err);
}
