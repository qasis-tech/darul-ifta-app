import React from "react";
import "./question.number.styles.scss";

export default function QuestionNumber({ data }) {
  const tempSubCategory = data?.sub_category?.map((subcategory) => {
    return subcategory.label;
  });

  return (
    <div className="question-number-section">
      <div className="col-md-12 py-1 qid">
        <h6>
          Question ID : QID-{data?.slNo.toString().padStart(3, "0") || "N/A"} /
          Madhab : {data?.madhab?.title || "N/A"} / SubCategory :
          {tempSubCategory?.map((item, index) => {
            return (
              <span>
                {item}
                &nbsp;&nbsp;&nbsp;
              </span>
            );
          })}
        </h6>
        <hr />
      </div>
    </div>
  );
}
