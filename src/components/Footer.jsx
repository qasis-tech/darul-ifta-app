import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InstaPic from "../assets/insta-icon.svg";
import FbPic from "../assets/fb-icon.svg";
import TwitterPic from "../assets/twiter-icon.svg";
import WhatsappPic from "../assets/whatsapp-icon.svg";
import YoutubePic from "../assets/youtube-icon.svg";
import GooglePic from "../assets/google_play_stor-icon.svg";
import Logo from "../assets/logo-main-logo.svg";

import routerList from "../routes/routerList";

import "../styles/footer.styles.scss";
import { Grid } from "@mui/material";
const FooterComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-section">
      <div className="container">
        <Grid container spacing={5} className="d-flex footer-container">
          <Grid item xs={12} md={5}>
            <div className="logo-section d-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start">
              <div className="logo-image-wrapper d-flex flex-column">
                <img src={Logo} alt="" width="250" className="logo-img" />
                <div className="hr-bar w-100"></div>
              </div>
              <div>
                <p className="img-logo-desc">
                  DARUL IFTA - AL JAMIATHUL KAUZARIYYA <br />
                  Al Jamiathul Kauzariyya Arabic College,
                  <br />
                  Edathala, Aluva, Kerala 683561 <br />
                  <a>Email :- contact@daruliftakauzariyya.com</a>
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="d-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start justify-content-center">
              <div className="useful-links">
                <h4 className="fw-bold">Useful Links</h4>
                <div className="hr-bar"></div>
                <ul>
                  <li onClick={() => navigate(`${routerList.user.about}`)}>
                    About Us
                  </li>
                  <li onClick={() => navigate(`${routerList.user.contact}`)}>
                    Contact Us
                  </li>
                  <li
                    onClick={() =>
                      navigate(`${routerList.user.rulesandregulations}`)
                    }
                  >
                    Rules & Regulations
                  </li>
                  <li>
                    <a  onClick={() =>
                      navigate(`${routerList.user.privacypolicy}`)
                    }>
                      Privacy Policy
                    </a>
                  </li>
                  <li
                  >
                    <a onClick={() =>
                      navigate(`${routerList.user.termsandconditions}`)
                    }>
                    Terms and Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            className="social-media d-flex justify-content-end"
          >
            <div className="app-social-media-section d-flex flex-column  justify-content-center">
              <div className="app-store row">
                <div>
                  <h4 className="fw-bold mb-2 mobileapp-heading">Mobile App</h4>
                  <div>
                    <a
                      className="google-image"
                      href="https://play.google.com/store/apps/details?id=com.darulifta.kauzariyya"
                      target="_blank"
                    >
                      <img src={GooglePic} alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="social-media my-4 row">
                <div>
                  <h4 className="fw-bold">Follow Us</h4>
                  <div className="">
                    <a href="https://www.facebook.com/Kauzariyya" target="_blank">
                      <img src={FbPic} alt="" />
                    </a>
                    <a href="https://instagram.com/kauzariyya" target="_blank">
                      <img src={InstaPic} alt="" />
                    </a>
                    <a href="https://twitter.com/kauzariyya" target="_blank">
                      <img src={TwitterPic} alt="" />
                    </a>
                    <a href="https://wa.me/919633712592?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%0AI%20need%20your%20help%20asking%20for%20a%20new%20fatwa%20%0Ain%20DARUL%20IFTA%20KAUZARIYYA%20%0AMy%20Name%20is%20;%20" target="_blank">
                      <img src={WhatsappPic} alt="" />
                    </a>
                    <a href="https://youtube.com/@Kauzariyya" target="_blank">
                      <img src={YoutubePic} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        {/* <div className="row footer-container p-0 mx-0">
          <div className="col-md-5 logo-section d-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start">
            <div className="logo-image-wrapper d-flex flex-column">
              <img src={Logo} alt="" width="250" className="logo-img" />
              <div className="hr-bar"></div>
            </div>
            <div>
              <p className="img-logo-desc">
                DARUL IFTA - AL JAMIATHUL KAUZARIYYA <br />
                Al Jamiathul Kauzariyya Arabic College,
                <br />
                Edathala, Aluva, Kerala 683561 <br />
                <a>Email :- contact@daruliftakauzariyya.com</a>
              </p>
            </div>
          </div>

          <div className="col-md-4 d-flex flex-column align-items-md-start align-items-lg-start align-items-xl-start justify-content-center">
            <div className="useful-links">
              <h4 className="fw-bold">Useful Links</h4>
              <div className="hr-bar"></div>
              <ul>
                <li onClick={() => navigate(`${routerList.user.about}`)}>
                  About Us
                </li>
                <li onClick={() => navigate(`${routerList.user.contact}`)}>
                  Contact Us
                </li>
                <li
                  onClick={() =>
                    navigate(`${routerList.user.rulesandregulations}`)
                  }
                >
                  Rules & Regulations
                </li>
                <li
                  onClick={() => navigate(`${routerList.user.privacypolicy}`)}
                >
                  Privacy Policy
                </li>
                <li
                  onClick={() =>
                    navigate(`${routerList.user.termsandconditions}`)
                  }
                >
                  Terms and Conditions
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 app-social-media-section d-flex flex-column  justify-content-center">
            <div className="app-store row">
              <div>
                <h4 className="fw-bold mb-2 mobileapp-heading">Mobile App</h4>
                <div>
                  <a
                    className="google-image"
                    href="https://play.google.com/store/apps/details?id=com.darulifta.kauzariyya"
                    target="_blank"
                  >
                    <img src={GooglePic} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="social-media my-4 row">
              <h4 className="fw-bold">Follow Us</h4>
              <div className="">
                <a href="https://www.facebook.com/Kauzariyya">
                  <img src={FbPic} alt="" />
                </a>
                <a href="https://instagram.com/kauzariyya">
                  <img src={InstaPic} alt="" />
                </a>
                <a href="https://twitter.com/kauzariyya">
                  <img src={TwitterPic} alt="" />
                </a>
                <a href="https://wa.me/919633712592?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%0AI%20need%20your%20help%20asking%20for%20a%20new%20fatwa%20%0Ain%20DARUL%20IFTA%20KAUZARIYYA%20%0AMy%20Name%20is%20;%20">
                  <img src={WhatsappPic} alt="" />
                </a>
                <a href="https://youtube.com/@Kauzariyya">
                  <img src={YoutubePic} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="identity px-0">
        <span>
          © 2022 <a href="https://kauzariyya.com/">DARUL IFTA KAUZARIYYA</a> All
          Rights Reserved. Designed & Developed with ❤️
        </span>
      </div>
    </div>
  );
};
export default FooterComponent;
