import React from "react";
import parse from "html-react-parser";
import { Divider, Grid, Paper, Typography, Box } from "@mui/material";
import Linkify from 'react-linkify';

import "./written.styles.scss";

export default function WrittenSection({ data }) {
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
          <Typography textAlign={"right"} sx={{ marginY: 2 }}>
            الجواب وبالله التوفيق حامداً و مصلّياً
          </Typography>
          <Typography
            variant="paragraph"
            sx={{ lineHeight: 1.5, textAlign: "justify" }}
          >
            {data?.answer ?
              <Linkify>
                {parse(data?.answer)}
              </Linkify>
              : "N/A"}
          </Typography>
          <Typography textAlign={"right"}>والله أعلم بالصواب</Typography>
        </div>
      </div>
      <Divider className="divider-section" />
      <div className="container d-flex main-section my-2">
        <div className="col-md-6  d-flex ">
          <Grid item xs={3}>
            <Typography variant="subtitle1" className="heading">
              Written by
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
              Verified by
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

      <Box sx={{ marginY: 2, marginBottom: 5 }} elevation={0}>
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
                sx={{ lineHeight: 1.8 }}
              />

            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
