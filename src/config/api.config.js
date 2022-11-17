import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Authorization"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbWlrYXZpdmVrMzhAZ21haWwuY29tIiwiaWF0IjoxNjYzNzM0OTg5LCJleHAiOjE2ODk2NTQ5ODl9.LmtTFhX6iVWtaVYkrwrQ5Ao9hWwCwAfUZT_KM_j-wVo";
// axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use((req) => {
  if (req?.headers["Content-Type"]) {
    req.headers["Content-Type"] = req.headers["Content-Type"];
    req.headers.common["Content-Type"] = req.headers["Content-Type"];
  } else {
    req.headers["Content-Type"] = "application/json";
    req.headers.common["Content-Type"] = "application/json";
  }

  return req;
});

axios.interceptors.response.use((res) => {
  return res?.data;
});

const useAxios = (url, payload) => {
  //   const [data, setData] = useState(null);
  //   const [error, setError] = useState("");
  //   const [loaded, setLoaded] = useState(true);
  //   const URL = `${process.env.BASE_URL}${url}`;
  //   useEffect(() => {
  //     axios
  //       .post(url, payload)
  //       .then((res) => setData(res.data))
  //       .catch((error) => setError(error.message))
  //       .finally(() => setLoaded(false));
  //   }, []);
  return;
  // { data, error, loaded };
};

export default useAxios;
