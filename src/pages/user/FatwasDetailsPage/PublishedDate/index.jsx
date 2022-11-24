import React from "react";
import moment from "moment";
import { Typography } from "@mui/material";

import "./publishedDate.styles.scss";

export default function PublishedDate({ data }) {
  return (
    <div className="published-section">
      <div className="col-md-12 py-1 date">
        <div className="container">
          <div className="published-date d-flex">
            <div className="me-3 d-flex">
              <Typography variant="subtitle1" className="pub-date">
                Created Date :{" "}
              </Typography>
              <Typography variant="subtitle1" className="mx-1 date">
                {moment(data?.createdAt).format("dddd, DD MMM YYYY") || "N/A"}
              </Typography>
            </div>

            <div className="me-3 d-flex">
              <Typography variant="subtitle1" className="pub-date">
                Published Date :{" "}
              </Typography>
              <Typography variant="subtitle1" className="mx-1 date">
                {moment(data?.updatedAt).format("dddd, DD MMM YYYY") || "N/A"}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
