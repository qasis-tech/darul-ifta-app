import axios from "axios";
import { URLS } from "../config/urls.config";

const getmadhabList = () => {
  return axios
    .get(URLS.madhab)
    .then((res) => res.data)
    .catch((err) => {
      console.log("error madhab", err);
      return [];
    });
};

export default getmadhabList;
