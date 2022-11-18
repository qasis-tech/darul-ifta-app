import React from "react";
import Carousel from "react-bootstrap/Carousel";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import Image1 from "../../../../assets/Ifta_ayah.svg";
import LogoImage from "../../../../assets/ifta-logo.svg";
import Image2 from "../../../../assets/Minaret.svg";

const Slider = () => {
  return (
    <div class="d-flex justify-content-center container">
      <Carousel className="carousel-hero">
        <Carousel.Item>
          <div class="row col-md-12 ">
            <div class="col-md-9 main-slider-section d-flex flex-column justify-content-center">
              <div class="max-width">
                <h2 class="my-2 head">Darul Ifta Kauzariyya</h2>
                <h6 class="my-4 desc">
                  A site for online fatwas (Islamic queries) running under the
                  supervision of Al Jamiathul Kauzariyya Fatwa board to guide
                  humanity to authentic rulings of Islam.
                </h6>

                <div class="d-flex justify-content-end">
                  <img src={Image1} alt="" srcset="" />
                </div>

                <div class="btn-wrapper d-flex">
                  <span class="custom-question-icon">
                    <QuestionMarkIcon />
                  </span>
                  <span class="d-flex align-items-center">
                    <span class="custom-btn"> Ask Question </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-3 logo-slider">
              <img
                src={LogoImage}
                class="img-thumbnails"
                alt=""
                style={{ height: "400px" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="row col-md-12">
            <div class="col-md-9 main-slider-section d-flex flex-column justify-content-center">
              <div class="max-width">
                <h2 class="my-2 head">Darul Ifta Kauzariyya</h2>
                <h6 class="my-4 desc">
                  A site for online fatwas (Islamic queries) running under the
                  supervision of Al Jamiathul Kauzariyya Fatwa board to guide
                  humanity to authentic rulings of Islam.
                </h6>

                <div class="d-flex justify-content-end">
                  <img src={Image1} alt="" srcset="" />
                </div>

                <div class="btn-wrapper d-flex">
                  <span class="custom-question-icon">
                    <QuestionMarkIcon />
                  </span>
                  <span class="d-flex align-items-center">
                    <span class="custom-btn"> Ask Question </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-3 logo-slider">
              <img
                src={Image2}
                class="img-thumbnails"
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
