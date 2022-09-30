import React, { useState, useEffect } from "react";
import axios from "axios";

import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import AskFatwasComponent from "../pages/user/Accounts/askFatwas";
import Profile from "../pages/user/Accounts/profile";
import QuestionContainer from "./QuestionContainer";
import AccountHomeComponent from "./AccountHomeComponent";
import { URLS } from "../config/urls.config";
import { formatDate } from "../utils/dateformat";
import Loader from "./common/Loader";
import { getLocal } from "../utils/localStore";

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
  const [isLoader, setLoader] = useState(false);
  const [status, setStatus] = useState(
    { id: 1, title: "Pending" },
    { id: 2, title: "Rejected" },
    { id: 3, title: "Re Submitted" },
    { id: 4, title: "Received to Darul Ifta" },
    { id: 5, title: "Assigned Mufti" },
    { id: 6, title: "Mufti Answered" },
    { id: 7, title: "Completed Verification" },
    { id: 8, title: "Published" }
  );
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getLocalData();
  }, []);

  useEffect(() => {
    getQuestionApi();
  }, []);

  const getLocalData = async () => {
    const data = await getLocal("@darul-ifta-login-details");
    setUserDetails(data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getQuestionApi = () => {
    setLoader(true);
    let url = `${URLS.question}`;

    if (status !== "") {
      url = `${URLS.question}?status=${status}`;
    }

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("resques2222>>>", res);
        setQuestionData(res.data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error quesss", err);
      });
  };

  return (
    <div className="user-tab-section">
      {isLoader ? (
        <Loader />
      ) : (
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
          <TabPanel value={value} index={0}>
            {/* <AccountHomeComponent/> */}
            {questionData?.length ? (
              questionData.map((question) => {
                return (
                  <QuestionContainer
                    key={question._id}
                    shortquestion={question.short_question}
                    question={question.question}
                    questionCount={question.id}
                    createdDate={formatDate(question.createdAt)}
                    views={question.views}
                  />
                );
              })
            ) : (
              <div>NO DATA </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <AskFatwasComponent /> */}
            {/* {questionData?.length ? (
              questionData.map((question) => {
                return (
                  <QuestionContainer
                    key={question._id}
                    shortquestion={question.short_question}
                    question={question.question}
                    questionCount={question.id}
                    createdDate={formatDate(question.createdAt)}
                    views={question.views}
                  />
                );
              })
            ) : (
              <div>NO DATA </div>
            )} */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* {questionData?.length ? (
              questionData.map((question) => {
                return (
                  <QuestionContainer
                    key={question._id}
                    shortquestion={question.short_question}
                    question={question.question}
                    questionCount={question.id}
                    createdDate={formatDate(question.createdAt)}
                    views={question.views}
                  />
                );
              })
            ) : (
              <div>NO DATA </div>
            )} */}
            {/* <Profile /> */}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {/* {questionData?.length ? (
              questionData.map((question) => {
                return (
                  <QuestionContainer
                    key={question._id}
                    shortquestion={question.short_question}
                    question={question.question}
                    questionCount={question.id}
                    createdDate={formatDate(question.createdAt)}
                    views={question.views}
                  />
                );
              })
            ) : (
              <div>NO DATA </div>
            )} */}
          </TabPanel>
        </Box>
      )}
    </div>
  );
}
