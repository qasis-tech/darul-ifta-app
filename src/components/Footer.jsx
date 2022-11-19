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
const FooterComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-section">
      <div className="row footer-container px-0 mx-0">
        <div className="col-md-4 logo-section d-flex flex-column align-items-md-center align-items-lg-center align-items-xl-center">
          <div className="">
            <img src={Logo} alt="" className="logo-img" />
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

        <div className="col-md-5 d-flex flex-column align-items-md-center align-items-lg-center align-items-xl-center justify-content-center">
          <div className="useful-links">
            <h4 className="fw-bold">Useful Links</h4>
            <div className="hr-bar"></div>
            <ul>
              <li  onClick={() => navigate(`${routerList.user.about}`)}>About Us</li>
              <li onClick={() => navigate(`${routerList.user.contact}`)}>Contact Us</li>
              <li  onClick={() => navigate(`${routerList.user.rulesandregulations}`)}>Rules & Regulations</li>
              <li onClick={() => navigate(`${routerList.user.privacypolicy}`)}>Privacy Policy</li>
              <li onClick={() => navigate(`${routerList.user.termsandconditions}`)}>Terms and Conditions</li>
            </ul>
          </div>
        </div>

        <div className="col-md-3 app-social-media-section d-flex flex-column justify-content-center">
          <div className="app-store row">
            <div >
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
              <img src={FbPic} alt="" />
              <img src={InstaPic} alt="" />
              <img src={TwitterPic} alt="" />
              <img src={WhatsappPic} alt="" />
              <img src={YoutubePic} alt="" />
            </div>
          </div>
        </div>
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
