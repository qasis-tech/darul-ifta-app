import { Divider, Typography } from "@mui/material";
import React from "react";
import "./detail.question.styles.scss";
export default function DetailedQuestion({ data }) {
  return (
    <div className="detail-question-section">
      <div className="container">
        <div className="col-md-12 pt-3">
          <Typography variant="subtitle1" >
            <span className="question-heading fw-bolder">Question : </span>{data?.question || "N/A"}
          </Typography>
        </div>
      </div>
    </div>
  );
}
