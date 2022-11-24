import { Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./question.number.styles.scss";

export default function QuestionNumber({ data }) {
  const tempSubCategory = data?.sub_category?.map(
    (subcategory) => subcategory.label
  );

  return (
    <Box className="question-number-section">
      <Grid container className=" qid" p={1} spacing={1}>
        <Grid
          container
          item
          sm={12}
          md={1.2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="subtitle1">QID</Typography>
          </Grid>
          <Grid item xs={8}>
            :
            <Chip
              label={`Q-${data?.slNo?.toString()?.padStart(3, "0")}`}
              size="small"
              sx={{ marginLeft: 1 }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="subtitle1">Madhab </Typography>
          </Grid>
          <Grid item xs={8}>
            :
            <Chip
              label={data?.madhab?.title}
              size="small"
              sx={{ marginLeft: 1 }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          sm={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography variant="subtitle1">Category</Typography>
          </Grid>
          <Grid container item xs={8}>
            :
            {tempSubCategory?.map((item, index) => {
              return (
                <Chip
                  key={index}
                  label={item}
                  size="small"
                  sx={{ marginLeft: 1 }}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
