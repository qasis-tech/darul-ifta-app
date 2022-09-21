import React, { useState, useEffect } from "react";
import InstaPic from "../assets/insta-icon.svg";
import FbPic from "../assets/fb-icon.svg";
import TwitterPic from "../assets/twiter-icon.svg";
import WhatsappPic from "../assets/whatsapp-icon.svg";
import YoutubePic from "../assets/youtube-icon.svg";
import GooglePic from "../assets/google_play_stor-icon.svg";
import Logo from "../assets/logo-main-logo.svg";
import "../styles/footer.styles.scss";
const FooterComponent = () => {
    return(
        <div className="footer-section">
  <div class="row footer-container px-0 mx-0">
    <div
      class="col-md-4 logo-section d-flex flex-column align-items-md-center align-items-lg-center align-items-xl-center"
    >
      <div class="">
        <img src={Logo} alt="" class="logo-img" />
        <div class="hr-bar"></div>
      </div>
      <div>
        <p class="img-logo-desc">
          DARUL IFTA - AL JAMIATHUL KAUZARIYYA <br />
          Al Jamiathul Kauzariyya Arabic College,<br />
          Edathala, Aluva, Kerala 683561 <br />
          Email :- contact@daruliftakauzariyya.com
        </p>
      </div>
    </div>

    <div
      class="col-md-5 d-flex flex-column align-items-md-center align-items-lg-center align-items-xl-center justify-content-center"
    >
      <div class="useful-links">
        <h4 class="fw-bold">Useful Links</h4>
        <div class="hr-bar"></div>
        <ul>
          <li routerLink="about-us">About Us</li>
          <li routerLink="contact-us">Contact Us</li>
          <li routerLink="rules-regulations">Rules & Regulations</li>
          <li routerLink="privacy-policy">Privacy Policy</li>
          <li routerLink="terms-conditions">Terms and Conditions</li>
        </ul>
      </div>
    </div>

    <div
      class="col-md-3 app-social-media-section d-flex flex-column justify-content-center"
    >
      <div class="app-store row">
        <div class="">
          <h5 class="fw-bold">Mobile App</h5>
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.darulifta.kauzariyya"
              target="_blank"
            >
              <img src={GooglePic} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div class="social-media my-4 row">
        <h4 class="fw-bold">Follow Us</h4>
        <div class="">
          <img src={FbPic} alt="" />
          <img src={InstaPic} alt="" />
          <img src={TwitterPic} alt="" />
          <img src={WhatsappPic} alt="" />
          <img src={YoutubePic} alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="identity px-0">
    <span>
      © 2022 <a href="https://kauzariyya.com/">DARUL IFTA KAUZARIYYA</a> All
      Rights Reserved. Designed & Developed with ❤️
    </span>
  </div>
</div>

    );
}
export default FooterComponent;
