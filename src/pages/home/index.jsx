import React from "react";
import Carousel from "react-bootstrap/Carousel";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Image1 from "../../assets/Ifta_ayah.svg";
import LogoImage from "../../assets/ifta-logo.svg";
import Image2 from "../../assets/Minaret.svg";
import HeaderComponent from "../../components/Header";
import FooterComponent from "../../components/Footer";
import QuestionComponent from "../../components/QuestionContainer";
import BackgroundImage from "../../assets/webback.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import "./home.styles.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeaderComponent />
      <div
        class="bg-custom slider-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div class="d-flex justify-content-center container">
          <Carousel className="carousel-hero">
            <Carousel.Item>
              <div class="row col-md-12">
                <div class="col-md-9 d-flex flex-column justify-content-center">
                  <div class="max-width">
                    <h2 class="my-2 head">Darul Ifta Kauzariyya</h2>
                    <h6 class="my-4 desc">
                      A site for online fatwas (Islamic queries) running under
                      the supervision of Al Jamiathul Kauzariyya Fatwa board to
                      guide humanity to authentic rulings of Islam.
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
                <div class="col-md-3">
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
                <div class="col-md-9 d-flex flex-column justify-content-center">
                  <div class="max-width">
                    <h2 class="my-2 head">Darul Ifta Kauzariyya</h2>
                    <h6 class="my-4 desc">
                      A site for online fatwas (Islamic queries) running under
                      the supervision of Al Jamiathul Kauzariyya Fatwa board to
                      guide humanity to authentic rulings of Islam.
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
                <div class="col-md-3">
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

        <section className="body-section">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div class="col side-accord-container shadow">
                  <div class="green">
                    <span class="text-white fs-6">Categories</span>
                  </div>
                  <div class="l-green"></div>
                  <div>
                    <div class="accordian-wrapper">
                      <Accordion class="accordian">
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon className="arrow-color" />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ul class="accordion-sub">
                            <li>Hanafi Madhab</li>
                            <li>Shafi Madhab</li>
                            <li>Common</li>
                          </ul>
                        </AccordionDetails>
                      </Accordion>

                      {/* <accordion class="accordian">
                        <accordion-group heading="Faiths & Beliefs">
                          <ul>
                            <li>Islamic Beliefs</li>
                          </ul>
                        </accordion-group>
                      </accordion> */}
                    </div>
                  </div>
                  <div class="madhab-category">
                    <div class="green mt-4">
                      <span class="text-white fs-6">Madhab</span>
                    </div>
                    <div class="l-green"></div>
                    <div>
                      <ul class="mt-2">
                        <li>Hanafi Madhab</li>
                        <li>Shafi Madhab</li>
                        <li>Common</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col custom-details shadow">
                  <div class="custom-details-column">
                    <h6>Visitor</h6>
                    <div>100</div>
                  </div>

                  <div class="custom-details-column">
                    <h6>Total Fatwas</h6>
                    <div>100</div>
                  </div>
                  <div class="custom-details-column">
                    <h6>Registered Users</h6>
                    <div>100</div>
                  </div>
                </div>
              </div>
              <div class="col-md-9 tab-container shadow rounded">
                <Tabs
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="action tabs example"
                >
                  
                  <Tab className="tab-name" label="All">
                    
                  </Tab>
                  <Tab className="tab-name" label="മലയാളം" />
                  <Tab  className="tab-name" label="English" />
                  <Tab className="tab-name" label="اردو"></Tab>
                  <Tab className="tab-name" label="العربيــــــــــــــــــة"></Tab>
                </Tabs>
                  <QuestionComponent/>

                {/* <tabset class="">
              <tab tab1 heading="All" id="0">
                <app-fatwas-list></app-fatwas-list>
              </tab>
              <tab tab1 heading="മലയാളം" id="2">
                <app-fatwas-list></app-fatwas-list>
              </tab>
              <tab tab2 heading="English" id="1">
                <app-fatwas-list></app-fatwas-list>
              </tab>
              <tab tab3 heading="اردو" id="4">
                <app-fatwas-list></app-fatwas-list>
              </tab>
              <tab tab4 heading="العربيــــــــــــــــــة" id="3">
                <app-fatwas-list></app-fatwas-list>
              </tab>
            </tabset> */}
              </div>
            </div>
          </div>
        </section>
        <FooterComponent/>
      </div>
    </div>
  );
};
export default HomePage;
