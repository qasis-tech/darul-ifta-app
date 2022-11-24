import { Divider, Typography } from "@mui/material";
import React from "react";
import "./detail.question.styles.scss";
export default function DetailedQuestion({ data }) {
  return (
    <div className="detail-question-section">
      <div className="container">
        <div className="col-md-12 py-3">
          <Typography variant="h6" className="question-heading fw-bolder">
            Question :
          </Typography>
          <Divider className="divider-section"/>
        </div>
        <div className="col-md-12 mb-3">
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
