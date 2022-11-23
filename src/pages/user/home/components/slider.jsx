import React from "react";
import Carousel from "react-bootstrap/Carousel";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import Image1 from "../../../../assets/Ifta_ayah.svg";
import LogoImage from "../../../../assets/ifta-logo.svg";
import Image2 from "../../../../assets/Minaret.svg";

const Slider = () => {
  return (
    <div className="d-flex justify-content-center container">
      <Carousel className="carousel-hero">
        <Carousel.Item>
          <div className="row col-md-12 ">
            <div className="col-md-9 main-slider-section d-flex flex-column justify-content-center">
              <div className="max-width">
                <h2 className="my-2 head">Darul Ifta Kauzariyya</h2>
                <h6 className="my-4 desc">
                  A site for online fatwas (Islamic queries) running under the
                  supervision of Al Jamiathul Kauzariyya Fatwa board to guide
                  humanity to authentic rulings of Islam.
                </h6>

                <div className="d-flex image-slider justify-content-end">
                  <img src={Image1} alt="" srcSet="" />
                </div>

                <div className="btn-wrapper d-flex">
                  <span className="custom-question-icon">
                    <QuestionMarkIcon />
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="custom-btn"> Ask Question </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 logo-slider">
              <img
                src={LogoImage}
                className="img-thumbnails"
                alt=""
                style={{ height: "400px" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="row col-md-12">
            <div className="col-md-9 main-slider-section d-flex flex-column justify-content-center">
              <div className="max-width">
                <h2 className="my-2 head">Darul Ifta Kauzariyya</h2>
                <h6 className="my-4 desc">
                  A site for online fatwas (Islamic queries) running under the
                  supervision of Al Jamiathul Kauzariyya Fatwa board to guide
                  humanity to authentic rulings of Islam.
                </h6>

                <div className="d-flex justify-content-end image-slider">
                  <img src={Image1} alt="" srcSet="" />
                </div>

                <div className="btn-wrapper d-flex">
                  <span className="custom-question-icon">
                    <QuestionMarkIcon />
                  </span>
                  <span className="d-flex align-items-center">
                    <span className="custom-btn"> Ask Question </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-3 logo-slider">
              <img
                src={Image2}
                className="img-thumbnails"
                alt=""
                style={{ height: "400px" }}
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
