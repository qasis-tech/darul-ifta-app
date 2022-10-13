import { Typography } from "@mui/material";
import React from "react";
import "./detail.question.styles.scss";
export default function DetailedQuestion({ data }) {
  return (
    <div className="detail-question-section mt-2">
      <div className="container">
        <div className="col-md-12 py-2">
          <Typography variant="h6" className="question-heading">
            Question :
          </Typography>
        </div>
        <div className="col-md-12 pb-2">
          <Typography className="question">
            {data?.question || "N/A"}
          </Typography>
        </div>
      </div>
    </div>
  );
}
