import { Typography } from "@mui/material";
import React from "react";
import "./single.question.styles.scss";
export default function SingleQuestion({ data }) {
  return (
    <div className="single-question-section">
      <div className="col-md-12 py-1 question">
        <Typography variant="h6">
        {data?.short_question || "N/A"}
        </Typography>
      </div>
    </div>
  );
}
