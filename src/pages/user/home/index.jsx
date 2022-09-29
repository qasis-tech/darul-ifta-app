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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setLanguage("English");
      getQuestionsApi();
    } else if (newValue === 2) {
      setLanguage("Malayalam");
      getQuestionsApi();
    } else if (newValue === 3) {
      setLanguage("Urdu");
      getQuestionsApi();
    } else if (newValue === 4) {
      setLanguage("Arabic");
      getQuestionsApi();
    } else {
      setLanguage("");
      getQuestionsApi();
    }
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getQuestionsApi();
  }, []);

  useEffect(() => {
    if (searchInput === "") getQuestionsApi();
  }, [searchInput]);

  const getQuestionsApi = () => {
    let url = `${URLS.question}?limit=${rowsPerPage}&skip=${
      page * rowsPerPage
    }`;

    if (searchInput !== "" && language !== "") {
      url = `${url}&search=${searchInput}&language=${language}`;
    } else if (searchInput !== "" && language === "") {
      url = `${url}&search=${searchInput}`;
    } else if (searchInput === "" && language !== "") {
      url = `${url}&language=${language}`;
    }

    axios
      .get(url)
      .then(({ data }) => setQuestionsData(data.data))
      .catch((err) => {
        setLoader(false);
        console.log("error questions", err);
      });
  };

  return (
    <div className="home-page">
      <div
        class="bg-custom slider-section"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <Slider />
        <section className="body-section">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <SideNavCategory
                  categoriesChip={categoriesChip}
                  selectedCategories={(e) => {
                    console.log("Selected Categories", e);
                    setCategoriesChip(e);
                  }}
                />
                <VisitorDetails />
              </div>
              <div class="col-md-9 tab-container shadow rounded">
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
                            backgroundColor: "red",
                          }}
                        >
                          <CloseIcon onClick={() => setSearchInput("")} />
                        </IconButton>
                        <IconButton onClick={getQuestionsApi}>
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
                      <Tab className="tab-name" label="All" />
                      <Tab label="English" />
                      <Tab label="മലയാളം" />
                      <Tab label="اردو" />
                      <Tab label="العربيــــــــــــــــــة" />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    {questionsData?.length ? (
                      questionsData.map((questions) => {
                        return (
                          <QuestionComponent
                            key={questions._id}
                            shortquestion={questions.short_question}
                            question={questions.question}
                            questionCount={questions.id}
                            createdDate={formatDate(questions.createdAt)}
                            views={questions.views}
                          />
                        );
                      })
                    ) : (
                      <div>NO DATA </div>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {questionsData?.length ? (
                      questionsData.map((questions) => {
                        return (
                          <QuestionComponent
                            key={questions._id}
                            shortquestion={questions.short_question}
                            question={questions.question}
                            questionCount={questions.id}
                            createdDate={formatDate(questions.createdAt)}
                            views={questions.views}
                          />
                        );
                      })
                    ) : (
                      <div>NO DATA </div>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {questionsData?.length ? (
                      questionsData.map((questions) => {
                        return (
                          <QuestionComponent
                            key={questions._id}
                            shortquestion={questions.short_question}
                            question={questions.question}
                            questionCount={questions.id}
                            createdDate={formatDate(questions.createdAt)}
                            views={questions.views}
                          />
                        );
                      })
                    ) : (
                      <div>NO DATA </div>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    {questionsData?.length ? (
                      questionsData.map((questions) => {
                        return (
                          <QuestionComponent
                            key={questions._id}
                            shortquestion={questions.short_question}
                            question={questions.question}
                            questionCount={questions.id}
                            createdDate={formatDate(questions.createdAt)}
                            views={questions.views}
                          />
                        );
                      })
                    ) : (
                      <div>NO DATA </div>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    {questionsData?.length ? (
                      questionsData.map((questions) => {
                        return (
                          <QuestionComponent
                            key={questions._id}
                            shortquestion={questions.short_question}
                            question={questions.question}
                            questionCount={questions.id}
                            createdDate={formatDate(questions.createdAt)}
                            views={questions.views}
                          />
                        );
                      })
                    ) : (
                      <div>NO DATA </div>
                    )}
                  </TabPanel>
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
export default HomePage;
