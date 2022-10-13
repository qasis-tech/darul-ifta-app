import React from "react";
import "./question.number.styles.scss";

export default function QuestionNumber({ data }) {
  return (
    <div className="question-number-section">
      <div className="col-md-12 py-1 qid">
        <h6>
          Question ID : QID-{data?.slNo || "N/A"} / Madhab :{" "}
          {data?.madhab?.title || "N/A"} / Category : Miscellaneous
        </h6>
        <hr />
      </div>
    </div>
  );
}
