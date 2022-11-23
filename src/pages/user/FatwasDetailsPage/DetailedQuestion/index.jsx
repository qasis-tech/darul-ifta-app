import { Typography } from "@mui/material";
import React from "react";
import "./detail.question.styles.scss";
export default function DetailedQuestion({ data }) {
  return (
    <div className="detail-question-section">
      <div className="container">
        <div className="col-md-12">
          <Typography variant="h6" className="question-heading">
            Question :
          </Typography>
          <hr />
        </div>
        <div className="col-md-12 my-4">
          <Typography
            variant="paragraph"
            className="question"
            sx={{ lineHeight: 1.5, textAlign: "justify" }}
          >
            {data?.question || "N/A"}
          </Typography>
        </div>
      </div>
    </div>
  );
}
