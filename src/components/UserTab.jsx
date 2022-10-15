import React, { useState, useEffect } from "react";
import axios from "axios";

import PropTypes from "prop-types";

import { Tabs, Tab, Typography, Box } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import AskFatwasComponent from "../pages/user/Accounts/askFatwas";
import Profile from "../pages/user/Accounts/profile";
import QuestionContainer from "./QuestionContainer";
import AccountHomeComponent from "./AccountHomeComponent";
import { URLS } from "../config/urls.config";
import { formatDate } from "../utils/dateformat";
import Loader from "./common/Loader";
import { getLocal } from "../utils/localStore";
import NoDataAvailable from "./NoDataAvailable";
import getQuestionListApi from "../services/getQuestionsList";
import "../pages/user/Accounts/home/account.home.styles.scss";

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

export default function UserTab() {
  const [value, setValue] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setLoader] = useState(false);

  const [userDetails, setUserDetails] = useState([]);

  // useEffect(() => {
  //   getLocal().then((res) => setUserDetails(res));
  // }, []);

  useEffect(() => {
    // getQuestionList();
    getLocal().then((res) => {
      setUserDetails(res)
      getQuestionList(`?userid=${res._id}`);
      // props.addUserLoginDetails(res);
    });
  }, []);
  const getQuestionList = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        setLoader(false);
        setQuestionData(res);
        // getQuestionList(`?userid`)
      })
      .catch((err) => {
        console.error("Error in getQuestionListApi", err);
        setLoader(false);
        setQuestionData([]);
      });
  };
console.log("data===>",userDetails._id)
  // useEffect(() => {
  //   getQuestionApi("");
  // }, [userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      getQuestionList(`?status=Published&userid=${userDetails._id}`);
    } else if (newValue === 2) {
      getQuestionList(`?status=Published&userid=${userDetails._id}`);
    } else if (newValue === 3) {
      getQuestionList(`?status=Rejected&userid=${userDetails._id}`);
    } else if (newValue === 0) {
      getQuestionList(`?userid=${userDetails._id}`);
    }
  };

  // const getQuestionApi = (selectedStatus) => {
  //   setLoader(true);
  //   let url = `${URLS.question}?userid=${userDetails?._id}`;
  //   if (selectedStatus !== "") {
  //     url = `${url}&status=${selectedStatus}`;
  //   }
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setLoader(false);
  //       setQuestionData(res?.data);
  //       console.log("11111111111", res);
  //     })
  //     .catch((err) => {
  //       setLoader(false);
  //       console.log("error quesss", err);
  //     });
  // };

  return (
    <div className="user-tab-section">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            className="main-tab"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab className="tab-name" label="My Questions" />
            <Tab label="Published Fatwas" />
            <Tab label="Pending Fatwas" />
            <Tab label="Rejected Fatwas" />
          </Tabs>
        </Box>
        {isLoading ? (
          <div style={{ minHeight: 300 }} className="d-flex align-items-center">
            <Loader />
          </div>
        ) : (
          <>
            <TabPanel value={value} index={0}>
              {questionData?.length ? (
                questionData.map((question) => {
                  return (
                    <QuestionContainer
                      key={question._id}
                      shortquestion={question.short_question}
                      question={question.question}
                      questionCount={question.slNo}
                      createdDate={formatDate(question.createdAt)}
                      views={question.views}
                      data={question}
                    />
                  );
                })
              ) : (
                <NoDataAvailable noStyle noBg />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {questionData?.length ? (
                questionData.map((question) => {
                  return (
                    <QuestionContainer
                      key={question._id}
                      shortquestion={question.short_question}
                      question={question.question}
                      questionCount={question.slNo}
                      createdDate={formatDate(question.createdAt)}
                      views={question.views}
                      data={question}
                    />
                  );
                })
              ) : (
                <NoDataAvailable noStyle noBg />
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {questionData?.length ? (
                questionData?.map((question) => {
                  return (
                    <QuestionContainer
                      key={question._id}
                      shortquestion={question.short_question}
                      question={question.question}
                      questionCount={question.slNo}
                      createdDate={formatDate(question.createdAt)}
                      views={question.views}
                      data={question}
                    />
                  );
                })
              ) : (
                <NoDataAvailable noStyle noBg />
              )}
            </TabPanel>
            <TabPanel value={value} index={3}>
              {questionData?.length ? (
                questionData.map((question) => {
                  return (
                    <QuestionContainer
                      key={question._id}
                      shortquestion={question.short_question}
                      question={question.question}
                      questionCount={question.slNo}
                      createdDate={formatDate(question.createdAt)}
                      views={question.views}
                      data={question}
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
  );
}
