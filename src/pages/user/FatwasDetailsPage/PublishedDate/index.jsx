import React from "react";
import moment from "moment";
import { Grid, Typography } from "@mui/material";

import "./publishedDate.styles.scss";

export default function PublishedDate({ data }) {
  console.log("data", data);
  return (
    <div className="published-section">
      <div className="col-md-12 py-1 date">
        <div className="container ">
          <div className="published-date d-flex ">
            <Grid container>
              {/* <Grid container item xs={12} md={4}>
                <Grid item md={4} xs={5}>
                  <Typography variant="subtitle1" className="pub-date">
                    Created Date
                  </Typography>
                </Grid>
                <Grid item md={0.2} xs={1}>
                  :
                </Grid>
                <Grid item md={7} xs={6}>
                  <Typography variant="subtitle1" className="mx-1 date">
                    {moment(data?.createdAt).format("dddd, DD MMM YYYY") ||
                      "N/A"}
                  </Typography>
                </Grid>
              </Grid> */}
              {data?.status === "Published" && (
                <Grid container item xs={12} md={5}>
                  <Grid item md={4} xs={5}>
                    <Typography variant="subtitle1" className="pub-date">
                      Published Date
                    </Typography>
                  </Grid>
                  <Grid item md={0.2} xs={1}>
                    :
                  </Grid>
                  <Grid item md={7} xs={6}>
                    <Typography variant="subtitle1" className="mx-1 date">
                      {moment(data?.updatedAt).format("dddd, DD MMM YYYY") ||
                        "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
