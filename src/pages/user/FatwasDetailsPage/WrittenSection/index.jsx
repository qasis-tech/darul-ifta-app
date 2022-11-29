import React from "react";
import parse from "html-react-parser";
import { Divider, Grid, Paper, Typography } from "@mui/material";

import "./written.styles.scss";
import { Box } from "@mui/system";

export default function WrittenSection({ data }) {
  console.log("data ===>", data);
  return (
    <div className="written-section">
      <div className="container">
        <div className="col-md-12 py-3">
          <Typography variant="h6" className="main-heading heading fw-bolder">
            Answer :
          </Typography>
          <Divider className="divider-section" />
        </div>
        <div className="col-md-12 mb-5">
          <Typography
            variant="paragraph"
            sx={{ lineHeight: 1.5, textAlign: "justify" }}
          >
            {parse(data?.answer) || "N/A"}
          </Typography>
        </div>
      </div>

      <Divider className="divider-section" />

      <div className="container d-flex main-section my-2">
        <div className="col-md-6  d-flex ">
          <Grid item xs={3}>
            <Typography variant="subtitle1" className="heading">
              Written By
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1">:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1">
              {data?.mufti?.display_title || "N/A"}
            </Typography>
          </Grid>
        </div>
        <div className="col-md-6  d-flex">
          <Grid item xs={3}>
            <Typography variant="subtitle1" className="heading">
              Verified By
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="subtitle1">:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1">
              {data?.verifier?.display_title || "N/A"}
            </Typography>
          </Grid>
        </div>
      </div>
      <Divider className="divider-section" />

      <Box sx={{ marginY: 2 }} elevation={0}>
        {data?.reference?.length ? (
          data.reference.map((item, index) => (
            <Box sx={{ p: 1, textAlign: "right" }} elevation={0} key={index}>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.8 }}>
                {item?.quote}
              </Typography>

              <Grid container justifyContent="end" sx={{ marginY: 2 }}>
                <Typography variant="subtitle1" sx={{ marginX: 1 }}>
                  (
                </Typography>
                <Typography variant="subtitle2" sx={{ lineHeight: 1.8 }}>
                  {item?.bookName}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginX: 1 }}>
                  /
                </Typography>
                <Typography variant="subtitle2" sx={{ lineHeight: 1.8 }}>
                  {item?.vol}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginX: 1 }}>
                  /
                </Typography>
                <Typography variant="subtitle2" sx={{ lineHeight: 1.8 }}>
                  {item?.pgNo}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginX: 1 }}>
                  )
                </Typography>
              </Grid>
              <Divider />
            </Box>
          ))
        ) : (
          <div className="container my-5 bg-danger">
            <div className="col-md-12 written-desc">
              <Typography
                variant="paragraph"
                className=""
                sx={{ lineHeight: 1.8 }}
              >
                {/* { || "N/A"} */}
              </Typography>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
