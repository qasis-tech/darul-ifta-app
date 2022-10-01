import React from "react";
import WhatsappImage from "../../../../assets/whatsapp.png";
import FacebookImage from "../../../../assets/facebook.png";
import InstagramImage from "../../../../assets/insta.png";
import TwitterImage from "../../../../assets/twitter.png";
import "./social.styles.scss";
export default function Social() {
  return (
    <div className="social-section mt-4">
      <div className="social-container">
        <div className="col py-2 d-flex">
          <img src={WhatsappImage} alt="Whatsapp Image" className="img"></img>
        </div>
        <div className="col py-2 d-flex">
          <img src={FacebookImage} alt="Whatsapp Image" className="img"></img>
        </div>
        <div className="col py-2 d-flex">
          <img src={InstagramImage} alt="Whatsapp Image" className="img"></img>
        </div>
        <div className="col py-2 d-flex">
          <img src={TwitterImage} alt="Whatsapp Image" className="img"></img>
        </div>
      </div>
    </div>
  );
}
