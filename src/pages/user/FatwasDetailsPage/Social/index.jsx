import React from "react";

import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
} from "react-share";

import WhatsappImage from "../../../../assets/whatsapp.png";
import FacebookImage from "../../../../assets/facebook.png";
import InstagramImage from "../../../../assets/insta1.png";
import TwitterImage from "../../../../assets/twitter.png";

import "./social.styles.scss";

export default function Social() {
  return (
    <div className="social-section mt-4">
      <div className="social-container">
        <div className="col py-2 d-flex">
          <a
            href="https://wa.me/919633712592?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%0AI%20need%20your%20help%20asking%20for%20a%20new%20fatwa%20%0Ain%20DARUL%20IFTA%20KAUZARIYYA%20%0AMy%20Name%20is%20;%20"
            target="_blank"
          >
            <img
              src={WhatsappImage}
              alt="Whatsapp Image"
              width="200"
              className="img"
            />
          </a>
        </div>
        <div className="col py-2 d-flex">
          <FacebookShareButton
            url={"https://www.facebook.com"}
            quote="please share this post"
            hashtag="#darulifta-kauzariyyaa"
          >
            <FacebookIcon />
          </FacebookShareButton>
          {/* <a href="https://www.facebook.com/Kauzariyya" target="_blank">
            <img
              src={FacebookImage}
              alt="Facebook Image"
              width="200"
              className="img"
            />
          </a> */}
        </div>
        <div className="col py-2 d-flex">
          <a href="https://instagram.com/kauzariyya" target="_blank">
            <img
              src={InstagramImage}
              alt="Instagram Image"
              width="200"
              className="img"
            />
          </a>
        </div>
        <div className="col py-2 d-flex">
          <a href="https://twitter.com/kauzariyya" target="_blank">
            <img
              src={TwitterImage}
              alt="Twitter Image"
              width="200"
              className="img"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
