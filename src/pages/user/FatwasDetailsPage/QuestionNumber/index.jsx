import { Chip } from "@mui/material";
import React from "react";
import "./question.number.styles.scss";

export default function QuestionNumber({ data }) {
  const tempSubCategory = data?.sub_category?.map(
    (subcategory) => subcategory.label
  );

  return (
    <div className="question-number-section">
      <div className="col-md-12 py-1 qid">
        <h6>
          Question ID :
          <Chip
            label={`Q${data?.slNo?.toString()?.padStart(3, "0")}`}
            className="single-chip"
            style={{ marginLeft: 15 }}
          />
          Madhab :
          <Chip
            label={data?.madhab?.title}
            className="single-chip"
            style={{ marginLeft: 10 }}
          />
          SubCategory :
          {tempSubCategory?.map((item, index) => {
            return (
              <Chip
                label={item}
                className="single-chip"
                style={{ marginLeft: 10 }}
              />
            );
          })}
        </h6>
        <hr />
      </div>
    </div>
  );
}
