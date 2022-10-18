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
import { addUserLoginDetails, addGeneralDetails } from "../../../redux/actions";
import { getLocal } from "../../../utils/localStore";

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
  const [language, setLanguage] = useState("");
  const [categoriesChip, setCategoriesChip] = useState({
    category: null,
    subcategory: null,
    madhab: null,
  });

  const [questionsData, setQuestionsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setLoader] = useState(false);

  const handleChange = (event, newValue) => {
    setSearchInput("");
    switch (newValue) {
      case 0:
        if (searchInput !== "") {
          getQuestionList(`?search=${searchInput}`);
        } else getQuestionList();
        break;
      case 1:
        if (searchInput !== "") {
          getQuestionList(`?language=English&search=${searchInput}`);
        } else getQuestionList(`?language=English`);

        break;
      case 2:
        if (searchInput !== "") {
          getQuestionList(`?language=Malayalam&search=${searchInput}`);
        } else getQuestionList(`?language=Malayalam`);

        break;
      case 3:
        if (searchInput !== "") {
          getQuestionList(`?language=Urdu&search=${searchInput}`);
        } else getQuestionList(`?language=Urdu`);

        break;
      case 4:
        if (searchInput !== "") {
          getQuestionList(`?language=Arabic&search=${searchInput}`);
        } else getQuestionList(`?language=Arabic`);

        break;
      default:
        break;
    }

    setValue(newValue);
  };

  const handleDelete = () => console.info("You clicked the delete icon.");

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getQuestionList();
    getLocal().then((res) => {
      props.addUserLoginDetails(res);
    });
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      if (value === 0) {
        getQuestionList();
      } else if (value === 1) {
        getQuestionList(`?language=English`);
      } else if (value === 2) {
        getQuestionList(`?language=Malayalam`);
      } else if (value === 3) {
        getQuestionList(`?language=Urdu`);
      } else if (value === 4) {
        getQuestionList(`?language=Arabic`);
      }
    }
  }, [searchInput]);

  const getQuestionList = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        setLoader(false);
        setQuestionsData(res);
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
        <section className="body-section">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <SideNavCategory
                  categoriesChip={categoriesChip}
                  selectedCategories={(e) => {
                    setCategoriesChip(e);
                  }}
                />
                <VisitorDetails />
              </div>
              <div className="col-md-9 tab-container shadow rounded">
                <div className="row chip-section">
                  <div className="">
                    {!!categoriesChip?.category && (
                      <Chip
                        label={categoriesChip?.category?.category}
                        className="single-chip"
                        onDelete={() => handleDelete()}
                      />
                    )}
                    {!!categoriesChip?.subcategory && (
                      <Chip
                        label={categoriesChip?.subcategory?.label}
                        className="single-chip"
                        onDelete={() => handleDelete()}
                      />
                    )}
                    {!!categoriesChip?.madhab && (
                      <Chip
                        label={categoriesChip?.madhab?.title}
                        className="single-chip"
                        onDelete={() => handleDelete()}
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
                          <CloseIcon
                            onClick={() => {
                              setSearchInput("");
                              getQuestionList();
                            }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            if (value === 0) {
                              getQuestionList(`?search=${searchInput}`);
                            } else if (value === 1) {
                              getQuestionList(
                                `?language=English&search=${searchInput}`
                              );
                            } else if (value === 2) {
                              getQuestionList(
                                `?language=Malayalam&search=${searchInput}`
                              );
                            } else if (value === 3) {
                              getQuestionList(
                                `?language=Urdu&search=${searchInput}`
                              );
                            } else if (value === 4) {
                              getQuestionList(
                                `?language=Arabic&search=${searchInput}`
                              );
                            }
                          }}
                        >
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
                    <div>
                      <Loader skeleton layers={2} />
                    </div>
                  ) : (
                    <>
                      <TabPanel value={value} index={0}>
                        {questionsData?.length ? (
                          questionsData?.map((questions) => {
                            return (
                              <QuestionComponent
                                key={questions?._id}
                                shortquestion={questions?.short_question}
                                question={questions?.question}
                                questionCount={questions?.slNo}
                                createdDate={formatDate(questions?.createdAt)}
                                views={questions?.views}
                                data={questions}
                              />
                            );
                          })
                        ) : (
                          <NoDataAvailable noStyle noBg />
                        )}
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        {questionsData?.length ? (
                          questionsData?.map((questions) => {
                            return (
                              <QuestionComponent
                                key={questions?._id}
                                id={questions?._id}
                                shortquestion={questions?.short_question}
                                question={questions?.question}
                                questionCount={questions?.slNo}
                                createdDate={formatDate(questions?.createdAt)}
                                views={questions?.views}
                                data={questions}
                              />
                            );
                          })
                        ) : (
                          <NoDataAvailable noStyle noBg />
                        )}
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        {questionsData?.length ? (
                          questionsData.map((questions) => {
                            return (
                              <QuestionComponent
                                key={questions?._id}
                                shortquestion={questions?.short_question}
                                question={questions?.question}
                                questionCount={questions?.slNo}
                                createdDate={formatDate(questions?.createdAt)}
                                views={questions?.views}
                                data={questions}
                              />
                            );
                          })
                        ) : (
                          <NoDataAvailable noStyle noBg />
                        )}
                      </TabPanel>
                      <TabPanel value={value} index={3}>
                        {questionsData?.length ? (
                          questionsData?.map((questions) => {
                            return (
                              <QuestionComponent
                                key={questions?._id}
                                shortquestion={questions?.short_question}
                                question={questions?.question}
                                questionCount={questions?.slNo}
                                createdDate={formatDate(questions?.createdAt)}
                                views={questions?.views}
                                data={questions}
                              />
                            );
                          })
                        ) : (
                          <NoDataAvailable noStyle noBg />
                        )}
                      </TabPanel>
                      <TabPanel value={value} index={4}>
                        {questionsData?.length ? (
                          questionsData?.map((questions) => {
                            return (
                              <QuestionComponent
                                key={questions?._id}
                                shortquestion={questions?.short_question}
                                question={questions?.question}
                                questionCount={questions?.slNo}
                                createdDate={formatDate(questions?.createdAt)}
                                views={questions?.views}
                                data={questions}
                              />
                            );
                          })
                        ) : (
                          <NoDataAvailable noStyle noBg />
                        )}
                      </TabPanel>
                    </>
                  )}
                </Box>
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  addUserLoginDetails: (payload) => dispatch(addUserLoginDetails(payload)),
  addGeneralDetails: (payload) => dispatch(addGeneralDetails(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
