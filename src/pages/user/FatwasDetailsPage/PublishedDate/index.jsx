import moment from "moment";
import React from "react";
import QuestionNumberComponent from "../QuestionNumber";
import "./publishedDate.styles.scss";
export default function PublishedDate({ data }) {
  return (
    <div className="published-section">
      <div className="col-md-12 py-1 date">
        <div className="container">
          <div className="published-date d-flex">
            <span className="pub-date">
              Created Date :{" "}
              {moment(data?.createdAt).format("DD/MM/YYYY,dddd") || "N/A"}
            </span>
            <span className="pub-date">
              Published Date :{" "}
              {moment(data?.updatedAt).format("DD/MM/YYYY,dddd") || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
