import React from "react";
import Carousel from "react-bootstrap/Carousel";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import slider1 from "../../../../assets/images/slider-01.png";
import slider2 from "../../../../assets/images/slider-02.png";
import slider3 from "../../../../assets/images/slider-03.png";
import slider4 from "../../../../assets/images/slider-04.png";
import slider5 from "../../../../assets/images/slider-05.png";

import LogoImage from "../../../../assets/ifta-logo.svg";
import Image2 from "../../../../assets/Minaret.svg";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routerList from "../../../../routes/routerList";

const Slider = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center container">
      <Carousel
        className="carousel-hero pointer"
        onClick={() => navigate(`${routerList.user.accountUser}`)}
      >
        <Carousel.Item>
          <Grid container>
            <Grid item>
              <img
                src={slider1}
                alt="slider images"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          </Grid>
        </Carousel.Item>
        <Carousel.Item>
          <Grid container>
            <Grid item>
              <img
                src={slider2}
                alt="slider images"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          </Grid>
        </Carousel.Item>
        <Carousel.Item>
          <Grid container>
            <Grid item>
              <img
                src={slider3}
                alt="slider images"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          </Grid>
        </Carousel.Item>
        <Carousel.Item>
          <Grid container>
            <Grid item>
              <img
                src={slider4}
                alt="slider images"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          </Grid>
        </Carousel.Item>
        <Carousel.Item>
          <Grid container>
            <Grid item>
              <img
                src={slider5}
                alt="slider images"
                style={{ width: "100%", height: "100%" }}
              />
            </Grid>
          </Grid>
          {/* <div className="row col-md-12 ">
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
          </div> */}
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
