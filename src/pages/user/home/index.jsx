import React, { useEffect, useState } from "react";
import axios from "axios";

import { URLS } from "../../../config/urls.config";

import {
  TextField,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

import HeaderComponent from "../../../components/Header";
import FooterComponent from "../../../components/Footer";
import QuestionComponent from "../../../components/QuestionContainer";
import Loader from "../../../components/common/Loader";
import BackgroundImage from "../../../assets/webback.png";
import { formatDate } from "../../../utils/dateformat";

import "./home.styles.scss";
import Slider from "./components/slider";
import SideNavCategory from "./components/sideNavCategory";
import VisitorDetails from "./components/visitorDetails";
import getQuestionListApi from "../../../services/getQuestionsList";
import NoDataAvailable from "../../../components/NoDataAvailable";

import { connect } from "react-redux";
import {
  addUserLoginDetails,
  addGeneralDetails,
  addHomeFilter,
} from "../../../redux/actions";
import { getLocal } from "../../../utils/localStore";
import { minHeight } from "@mui/system";
import { Grade } from "@mui/icons-material";

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
  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoading, setLoader] = useState(false);

  const languages = ["", "English", "Malayalam", "Urdu", "Arabic"];

  useEffect(() => {
    getVisitorApi();
    getLocal().then((res) => {
      props.addUserLoginDetails(res);
    });
    setDefaultToProps(() => categoryMadhabFilter(null, null));
  }, []);

  useEffect(() => {
    if (props?.homeFilter?.category || props?.homeFilter?.madhab) {
      categoryMadhabFilter();
    }
  }, [props?.homeFilter?.category, props?.homeFilter?.madhab]);

  useEffect(() => {
    if (searchInput === "") {
      categoryMadhabFilter();
    }
  }, [searchInput]);

  const handleChange = (event, newValue) => {
    setSearchInput("");

    let parms = "";

    if (searchInput !== "") {
      parms = `?status=Published&language=${languages[newValue]}&search=${searchInput}`;
    } else {
      parms = `?status=Published&language=${languages[newValue]}`;
    }
    if (props?.homeFilter?.category?.label) {
      parms = `${parms}&subCategory=${encodeURIComponent(
        props?.homeFilter?.category?.label
      )}`;
    }
    if (props?.homeFilter?.madhab?.title) {
      parms = `${parms}&madhab=${props?.homeFilter?.madhab?.title}`;
    }

    getQuestionList(parms);
    setValue(newValue);
  };

  const handleDelete = (item) => {
    let temp = { ...props.homeFilter };
    temp[item] = null;
    props.addHomeFilter(temp);
    categoryMadhabFilter(temp.category, temp.madhab);
  };

  const setDefaultToProps = (cb) => {
    let temp = { ...props.homeFilter };
    temp.category = null;
    temp.madhab = null;

    props.addHomeFilter(temp);

    setTimeout(() => {
      if (cb) cb();
    }, 1000);
  };

  const categoryMadhabFilter = (category, madhab) => {
    console.log("AAAAAAAAAAAAAA 02");
    let params = "?status=Published";
    if (category === null || madhab === null) {
      if (category === null && madhab !== null) {
        params = `&madhab=${props.homeFilter.madhab.title}&language=${languages[value]}`;
      } else if (madhab === null && category !== null) {
        params = `&subCategory=${encodeURIComponent(
          props?.homeFilter?.category?.label
        )}&language=${languages[value]}`;
      }
    } else {
      if (props?.homeFilter?.category && props.homeFilter.madhab) {
        params = `&subCategory=${encodeURIComponent(
          props?.homeFilter?.category?.label
        )}&madhab=${props.homeFilter.madhab.title}`;
      } else if (props?.homeFilter?.category) {
        params = `&subCategory=${encodeURIComponent(
          props?.homeFilter?.category?.label
        )}`;
      } else if (props?.homeFilter?.madhab) {
        params = `&madhab=${props.homeFilter.madhab.title}`;
      }
    }
    if (value > 0) {
      if (params === "") {
        params = `&language=${languages[value]}`;
      } else params = `${params}&language=${languages[value]}`;
    }

    if (searchInput !== "") {
      if (params === "") {
        params = `&search=${searchInput}`;
      } else params = `${params}&search=${searchInput}`;
    }

    getQuestionList(params);
  };

  const getVisitorApi = () => {
    setLoader(true);
    axios
      .get(URLS.visitors)
      .then((res) => setLoader(false))
      .catch((err) => {
        setLoader(false);
        console.log("error visitors", err);
      });
  };

  const getQuestionList = (params) => {
    console.log("PARAMS ====>", params);
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        setLoader(false);

        setQuestionsData(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error in getQuestionListApi", err);
        setQuestionsData([]);
      });
  };

  return (
    <div className="home-page">
      <div
        className="bg-custom slider-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <Slider />
        <section className="body-section pt-2">
          <div className="container">
            <div className="row side-row">
              <div className="col-md-3 col-sm-2 col-xs-2 main-madhub-section">
                <SideNavCategory />
                <VisitorDetails />
              </div>
              <div className="col-md-9 ">
                <Paper elevation={2} className="tab-container p-4">
                  <div className="row chip-section">
                    <div className="">
                      {props?.homeFilter?.category && (
                        <Chip
                          label={props?.homeFilter?.category?.label}
                          className="single-chip"
                          onDelete={() => handleDelete("category")}
                        />
                      )}
                      {props?.homeFilter?.madhab && (
                        <Chip
                          label={props?.homeFilter?.madhab?.title}
                          className="single-chip"
                          onDelete={() => handleDelete("madhab")}
                        />
                      )}
                    </div>
                  </div>
                  <TextField
                    label="Search"
                    fullWidth
                    size="small"
                    className="search-btn"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            sx={{
                              visibility:
                                searchInput !== "" ? "visible" : "hidden",
                            }}
                          >
                            <CloseIcon onClick={() => setSearchInput("")} />
                          </IconButton>
                          <IconButton onClick={() => categoryMadhabFilter()}>
                            <SearchIcon
                              sx={{
                                visibility:
                                  searchInput !== "" ? "visible" : "hidden",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider",padding:0 }}>
                      <Tabs
                        className="main-tab"
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab
                          className="tab-name"
                          label="All"
                          {...a11yProps(0)}
                        />
                        <Tab label="English" {...a11yProps(1)} />
                        <Tab label="മലയാളം" {...a11yProps(2)} />
                        <Tab label="اردو" {...a11yProps(3)} />
                        <Tab
                          label="العربيــــــــــــــــــة"
                          {...a11yProps(4)}
                        />
                      </Tabs>
                    </Box>
                    {isLoading ? (
                      <Loader skeleton layers={1} />
                    ) : (
                      <>
                        {[0, 1, 2, 3, 4].map((item, i) => {
                          return (
                            <TabPanel value={value} index={item} key={i} className="main-tab">
                              {questionsData?.length ? (
                                questionsData?.map((questions) => {
                                  return (
                                    <QuestionComponent
                                      key={questions?._id}
                                      id={questions?._id}
                                      shortquestion={questions?.short_question}
                                      question={questions?.question}
                                      questionCount={questions?.slNo}
                                      createdDate={formatDate(
                                        questions?.createdAt
                                      )}
                                      views={questions?.views}
                                      data={questions}
                                    />
                                  );
                                })
                              ) : (
                                <div
                                  className="d-flex justify-content-center align-items-center"
                                  style={{ minHeight: "470px" }}
                                >
                                  <NoDataAvailable noStyle noBg />
                                </div>
                              )}
                            </TabPanel>
                          );
                        })}
                      </>
                    )}
                  </Box>
                </Paper>
              </div>
            </div>
            {/* <div className="row side-row">
              <div className="col-md-3 col-sm-2 col-xs-2 main-madhub-section">
                <SideNavCategory />
                <VisitorDetails />
              </div>
              <div className="col-md-9 ">
                <Paper className="tab-container">
                <div className="row chip-section">
                  <div className="">
                    {props?.homeFilter?.category && (
                      <Chip
                        label={props?.homeFilter?.category?.label}
                        className="single-chip"
                        onDelete={() => handleDelete("category")}
                      />
                    )}
                    {props?.homeFilter?.madhab && (
                      <Chip
                        label={props?.homeFilter?.madhab?.title}
                        className="single-chip"
                        onDelete={() => handleDelete("madhab")}
                      />
                    )}
                  </div>
                </div>
                <TextField
                  label="Search"
                  fullWidth
                  size="small"
                  className="search-btn"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{
                            visibility:
                              searchInput !== "" ? "visible" : "hidden",
                          }}
                        >
                          <CloseIcon onClick={() => setSearchInput("")} />
                        </IconButton>
                        <IconButton onClick={() => categoryMadhabFilter()}>
                          <SearchIcon
                            sx={{
                              visibility:
                                searchInput !== "" ? "visible" : "hidden",
                            }}
                          />
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
                      <Tab label="English" {...a11yProps(1)} />
                      <Tab label="മലയാളം" {...a11yProps(2)} />
                      <Tab label="اردو" {...a11yProps(3)} />
                      <Tab
                        label="العربيــــــــــــــــــة"
                        {...a11yProps(4)}
                      />
                    </Tabs>
                  </Box>
                  {isLoading ? (
                    <Loader skeleton layers={1} />
                  ) : (
                    <>
                      {[0, 1, 2, 3, 4].map((item) => {
                        return (
                          <TabPanel value={value} index={item}>
                            {questionsData?.length ? (
                              questionsData?.map((questions) => {
                                return (
                                  <QuestionComponent
                                    key={questions?._id}
                                    id={questions?._id}
                                    shortquestion={questions?.short_question}
                                    question={questions?.question}
                                    questionCount={questions?.slNo}
                                    createdDate={formatDate(
                                      questions?.createdAt
                                    )}
                                    views={questions?.views}
                                    data={questions}
                                  />
                                );
                              })
                            ) : (
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ minHeight: "445px" }}
                              >
                                <NoDataAvailable noStyle noBg />
                              </div>
                            )}
                          </TabPanel>
                        );
                      })}
                    </>
                  )}
                </Box>
                </Paper>
              </div>
            </div> */}
          </div>
        </section>
        {props.children}
      </div>
      <FooterComponent />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  addUserLoginDetails: (payload) => dispatch(addUserLoginDetails(payload)),
  addGeneralDetails: (payload) => dispatch(addGeneralDetails(payload)),
  addHomeFilter: (payload) => dispatch(addHomeFilter(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
