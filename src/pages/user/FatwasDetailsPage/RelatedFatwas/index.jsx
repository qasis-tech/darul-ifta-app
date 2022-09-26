import { Chip, Typography } from "@mui/material";
import React from "react";
import "./related.fatwas.styles.scss";
export default function RelatedFatwas() {
  return (
    <div className="related-fatwas-section mt-3 pb-2">
      <div className="related-fatwas-container">
        <div className="col-md-12 main-head">
          <Typography className="heading">Related Fatwas</Typography>
        </div>
        <div className="container">
          <div className="col-md-12 sub-details my-3  py-2 px-2">
            <Typography className="title">
              Is it Fathiha Compulsory for Jamath Namaz
            </Typography>
            <div className="row d-flex sub-btn justify-content-between mt-2 pb-1">
              <div className="col-md-6">
                <Chip label="QID:000123" className="id-button" />
              </div>
              <div className="col-md-6">
                <Chip label="ReadMore" className="id-button" />
              </div>
            </div>
          </div>

          <div className="col-md-12 sub-details my-3  py-2 px-2">
            <Typography className="title">
              Is it Fathiha Compulsory for Jamath Namaz
            </Typography>
            <div className="row d-flex sub-btn justify-content-between mt-2 pb-1">
              <div className="col-md-6">
                <Chip label="QID:000123" className="id-button" />
              </div>
              <div className="col-md-6">
                <Chip label="ReadMore" className="id-button" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
