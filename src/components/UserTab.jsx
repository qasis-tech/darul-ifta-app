import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Tabs, Tab, Typography, Box } from "@mui/material";

import QuestionContainer from "./QuestionContainer";
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

const UserTab = ({
  getQuestionData,
  getAnswerData,
  userLoginDetails,
  apiTriggeres,
}) => {
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    getQuestionList(`?userid=${userLoginDetails?._id}`);
  }, []);

  useEffect(() => {
    if (apiTriggeres?.userGetQuesList) {
      getQuestionList(`?userid=${userLoginDetails?._id}`);
    }
  }, [apiTriggeres]);

  const getQuestionList = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        setLoader(false);
        if (params === `?userid=${userLoginDetails?._id}`) {
          setQuestionData(res);
          getQuestionData(res?.length);
        } else if (
          params === `?status=Published&userid=${userLoginDetails?._id}`
        ) {
          getAnswerData(res?.length);
          setQuestionData(res);
        } else {
          setQuestionData(res);
        }
      })
      .catch((err) => {
        console.error("Error in getQuestionListApi", err);
        setLoader(false);
        setQuestionData([]);
      });
  };
  // useEffect(() => {
  //   getQuestionApi("");
  // }, [userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      getQuestionList(`?status=Published&userid=${userLoginDetails?._id}`);
    } else if (newValue === 2) {
      getQuestionList(`?status=Pending&userid=${userLoginDetails?._id}`);
    } else if (newValue === 3) {
      getQuestionList(`?status=Rejected&userid=${userLoginDetails?._id}`);
    } else if (newValue === 0) {
      getQuestionList(`?userid=${userLoginDetails?._id}`);
    }
  };

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
          <div className="w-100 px-5">
            <Loader skeleton />
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
};

const mapStateToProp = (state) => ({
  ...state,
});

export default connect(mapStateToProp)(UserTab);
