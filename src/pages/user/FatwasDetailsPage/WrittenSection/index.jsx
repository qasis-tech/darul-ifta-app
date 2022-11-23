import React from "react";

import { Divider, Typography } from "@mui/material";

import "./written.styles.scss";

export default function WrittenSection({ data }) {
  return (
    <div className="written-section">
      <div className="container verified-section">
        <div className="col-md-12 ">
          <Typography variant="h6" className="main-heading heading">
            Answer :
          </Typography>

          <Typography variant="paragraph" sx={{ lineHeight: 1.8 }}>
            {data?.answer || "N/A"}
          </Typography>
        </div>
        {/* <div className="col-md-12">
          <Typography variant="h6" className="verified-head">
            Verified By : {data?.verifier?.display_title || "N/A"}
          </Typography>
        </div> */}
        {/* <div className="col-md-12">
          <Typography variant="h6" className="sub">
            {data?.verified_by || "N/A"}
          </Typography>
        </div> */}
      </div>

      <Divider />

      <div className="container d-flex main-section">
        <div className="col-md-6 heading">
          <Typography variant="h6" className="main-heading">
            Written By : {data?.mufti?.display_title || "N/A"}
          </Typography>
        </div>
        <div className="col-md-6 heading">
          <Typography variant="h6" className="main-heading">
            Verified By : {data?.verifier?.display_title || "N/A"}
          </Typography>
        </div>
        {/* <div className="col-md-12 my-2">
          <div className="written-desc">{data?.answer || "N/A"}</div>
        </div> */}
      </div>

      <Typography variant="paragraph" sx={{ lineHeight: 1.8 }}>
        {data?.answer || "N/A"}
      </Typography>
    </div>
  );
}
