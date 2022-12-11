import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon, WhatsappIcon, TwitterIcon
} from "react-share";

import "./social.styles.scss";

export default function Social(questionDetails) {

  const { pathname } = useLocation()
  const BaseUrl = process.env.REACT_APP_PUBLIC_URL



  return (
    <Grid className="pt-3">
      <div className="social-container">
        <div className="col py-2 d-flex">
          <WhatsappShareButton url={`${BaseUrl}${pathname}`} title={questionDetails.question} separator="" >
            <WhatsappIcon className="img" />
          </WhatsappShareButton>
        </div>
        <div>
          <FacebookShareButton className="col py-2 d-flex"
            url={`${BaseUrl}/${pathname}`}
            quote="Fatwas"
            hashtag={"#daruliftakauzariyya"}
          >
            <FacebookIcon className="img" />
          </FacebookShareButton>
        </div>
        <div className="col py-2 d-flex">
          <TwitterShareButton
            url={`${BaseUrl}${pathname}`} title={questionDetails?.short_question}
            hashtags={["daruliftakaurariyya"]}
          >
            <TwitterIcon className="img" />
          </TwitterShareButton>
        </div>
      </div>

    </Grid>
  );
}
