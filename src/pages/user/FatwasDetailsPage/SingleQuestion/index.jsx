import React from "react";
import "./single.question.styles.scss";
export default function SingleQuestion({ data }) {
  return (
    <div className="single-question-section">
      <div className="col-md-12 py-1 mb-2 question">
        {data?.short_question || "N/A"}
      </div>
    </div>
  );
}
