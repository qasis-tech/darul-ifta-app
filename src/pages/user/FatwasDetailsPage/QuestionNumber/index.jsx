import React from "react";
import { Chip, Grid, Typography, Box } from "@mui/material";

import "./question.number.styles.scss";

export default function QuestionNumber({ data }) {

  const tempSubCategory = data?.sub_category?.map(
    (subcategory) => subcategory.label
  );

  return (
    <Box className="question-number-section mt-5 pt-5">
      <Grid container className=" qid" p={1} spacing={1}>
        <Grid container item sm={12} direction="row" className="ps-0">
          <Typography variant="subtitle1">
            QID : {`Q-${data?.slNo?.toString()?.padStart(3, "0")}`}, Madhab :{" "}
            {data?.madhab?.title}, Category :{" "}
            {tempSubCategory && tempSubCategory?.length && tempSubCategory[0]},
            Status : {data?.status}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
