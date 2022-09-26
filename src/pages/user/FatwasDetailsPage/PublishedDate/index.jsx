import React from "react";
import QuestionNumberComponent from "../QuestionNumber";
import "./publishedDate.styles.scss";
export default function PublishedDate() {
  return (
    <div className="published-section">
      <div className="col-md-12 py-1 date">
        <div className="container">
          <div className="published-date">
            <span className="pub-date">Published Date : 20/10/2022 Monday</span>
          </div>
        </div>
      </div>
    </div>
  );
}
