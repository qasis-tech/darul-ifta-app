import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import URLS from "../routes/routerList";

import "../styles/question.container.styles.scss";

const QuestionContainer = (props) => {
  const navigate = useNavigate();
  return (
    <section
      className="question-section"
      onClick={() => navigate(`${URLS.user.fatwasDetailsPage}/${props?.id}`)}
    >
      <Paper elevation={2}>
        <div className="question-container">
          <div className="row">
            <div className="col-md-12 heading-section">
              <Typography variant="subtitle1">
                {props?.shortquestion}
              </Typography>
            </div>
            <div className="col-md-12 desc">
              <Typography variant="paragraph" className="line-clamp">
                {props?.question}
              </Typography>
            </div>
            <Grid
              container
              spacing={1}
              columns={{ xs: 4, md: 12 }}
              className="q-footer d-flex"
            >
              <Grid item xs={1} md={1} className="number-btn">
                <Typography variant="subtitle2" className="q-no" align="center">
                  Q{props?.questionCount?.toString().padStart(3, "0")}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} className="w-name d-flex">
                <Grid item xs={3} md={3}>
                  <Typography variant="subtitle1" className="writtenby-section">
                    Written By
                  </Typography>
                </Grid>

                <Grid item xs={1} md={1}>
                  <Typography variant="subtitle1" className="colon mx-1">
                    {" "}
                    :{" "}
                  </Typography>
                </Grid>
                <Grid item xs={9} md={8}>
                  <Typography variant="subtitle1">
                    {props?.data?.mufti?.display_title || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={3} xs={12} className="w-name d-flex">
                <Grid item xs={3} md={3}>
                  <Typography variant="subtitle1" className="writtenby-section">
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography variant="subtitle1" className="colon mx-1">
                    {" "}
                    :{" "}
                  </Typography>
                </Grid>
                <Grid item xs={9} md={9}>
                  <Typography variant="subtitle1">
                    {props?.createdDate}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={2} xs={12} className="w-name d-flex">
                <Grid item xs={3} md={5}>
                  <Typography variant="subtitle1" className="writtenby-section">
                    Views
                  </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography variant="subtitle1" className="colon mx-1">
                    {" "}
                    :{" "}
                  </Typography>
                </Grid>
                <Grid item xs={8} md={6}>
                  <Typography variant="subtitle1">{props?.views}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
    </section>
  );
};
export default QuestionContainer;
