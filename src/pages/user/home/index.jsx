import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// import { URLS } from "../../../config/urls.config";
import Carousel from "react-bootstrap/Carousel";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image1 from "../../../assets/Ifta_ayah.svg";
import LogoImage from "../../../assets/ifta-logo.svg";
import Image2 from "../../../assets/Minaret.svg";
import HeaderComponent from "../../../components/Header";
import FooterComponent from "../../../components/Footer";
import QuestionComponent from "../../../components/QuestionContainer";
import BackgroundImage from "../../../assets/webback.png";

import "./home.styles.scss";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HomePage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  useEffect(() => {
    getCatgoryListApi();
  }, []);

  const getCatgoryListApi = () => {
    const token = "##";
    axios
      .get("http://localhost:1337/category", {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res category===>>", res);
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };

  return (
    <div className="home-page">
      {/* <HeaderComponent /> */}
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
                          <Typography>Faiths & Beliefs</Typography>
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
                <div className="row chip-section">
                  <div className="">
                    <Chip
                      label="Chip Filled"
                      className="single-chip"
                      onDelete={handleDelete}
                    />
                    <Chip
                      label="Chip Filled"
                      className="single-chip"
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
                <TextField
                  label="Search"
                  fullWidth
                  size="small"
                  className="search-btn"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      className="main-tab"
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab className="tab-name" label="All" {...a11yProps(0)} />
                      <Tab label="മലയാളം" {...a11yProps(1)} />
                      <Tab label="English" {...a11yProps(2)} />
                      <Tab label="اردو" {...a11yProps(3)} />
                      <Tab
                        label="العربيــــــــــــــــــة"
                        {...a11yProps(4)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    Item One
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    Item Four
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    Item Five
                  </TabPanel>
                </Box>
                {/* <Tabs
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  className="main-tab"
                  aria-label="action tabs example"
                >
                  <Tab className="tab-name" label="All"></Tab>
                  <Tab className="tab-name" label="മലയാളം" />
                  <Tab className="tab-name" label="English" />
                  <Tab className="tab-name" label="اردو"></Tab>
                  <Tab
                    className="tab-name"
                    label="العربيــــــــــــــــــة"
                  ></Tab>
                </Tabs> */}
                <QuestionComponent />
              </div>
            </div>
          </div>
        </section>
        {props.children}
      </div>
      <FooterComponent />
    </div>
  );
};
export default HomePage;
