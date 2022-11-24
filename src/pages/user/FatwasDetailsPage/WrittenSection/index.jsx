import React from "react";

import { Divider, Typography } from "@mui/material";

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
          <Typography
          variant="paragraph"
            sx={{ lineHeight: 1.5, textAlign: "justify" }}
          >
            {data?.answer || "N/A"}
          </Typography>
        </div>
      </div>

      <Divider className="divider-section" />

      <div className="container mt-5 mb-2 d-flex main-section">
        <div className="col-md-6 heading d-flex">
          <Typography variant="h6" className="main-heading fw-bolder">
            Written By :
          </Typography>
          <Typography variant="h6" className="ms-1 sub">
            {data?.mufti?.display_title || "N/A"}
          </Typography>
        </div>
        <div className="col-md-6 heading d-flex">
          <Typography variant="h6" className="main-heading fw-bolder">
            Verified By :
          </Typography>
          <Typography variant="h6" className="ms-1 sub">
            {data?.verifier?.display_title || "N/A"}
          </Typography>
        </div>
        {/* <div className="col-md-12 my-2">
          <div className="written-desc">{data?.answer || "N/A"}</div>
        </div> */}
      </div>
      <Divider className="divider-section" />
      <div className="container my-5 ">
        <div className="col-md-12 written-desc">
          <Typography variant="paragraph" className="" sx={{ lineHeight: 1.8 }}>
            {data?.answer || "N/A"}
          </Typography>
        </div>
      </div>
    </div>
  );
}
