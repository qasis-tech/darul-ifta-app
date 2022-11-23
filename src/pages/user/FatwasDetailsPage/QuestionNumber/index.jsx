import { Chip, Typography } from "@mui/material";
import React from "react";
import "./question.number.styles.scss";

export default function QuestionNumber({ data }) {
  const tempSubCategory = data?.sub_category?.map(
    (subcategory) => subcategory.label
  );

  return (
    <div className="question-number-section">
      <div className="col-md-12 qid">
        <Typography variant="subtitle1">
          QID :
          <Chip
            label={`Q${data?.slNo?.toString()?.padStart(3, "0")}`}
            className="single-chip"
            style={{ margin: "0 10px" }}
          />
          Madhab :
          <Chip
            label={data?.madhab?.title}
            className="single-chip"
            style={{ margin: "0 10px" }}
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
        </Typography>
        <hr />
      </div>
    </div>
  );
}
