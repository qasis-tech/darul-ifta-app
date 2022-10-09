import axios from "axios";
import React, { useEffect, useState } from "react";
import { URLS } from "../../../../config/urls.config";

const VisitorDetails = () => {
  const [generalDetails, setGeneralDetails] = useState(null);
  useEffect(() => {
    getGeneralList();
  }, []);

  const getGeneralList = () => {
    axios
      .get(`${URLS.generals}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setGeneralDetails(data.data);
      })
      .catch((err) => {
        console.log("error generals", err);
      });
  };
  return (
    <div class="col custom-details shadow">
      <div class="custom-details-column">
        <h6>Visitor</h6>
        <div>{generalDetails?.visitors || "N/A"}</div>
      </div>

      <div class="custom-details-column">
        <h6>Total Fatwas</h6>
        <div>{generalDetails?.fatwas || "N/A"}</div>
      </div>
      <div class="custom-details-column">
        <h6>Registered Users</h6>
        <div>{generalDetails?.users || "N/A"}</div>
      </div>
    </div>
  );
};
export default VisitorDetails;
