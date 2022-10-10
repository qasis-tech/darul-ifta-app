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
import NoDataAvailable from "./NoDataAvailable";

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

  const [userDetails, setUserDetails] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getLocalData();
  }, []);

  useEffect(() => {
    getQuestionApi("");
  }, [userId]);

  const getLocalData = async () => {
    const data = await getLocal("@darul-ifta-user-login-details");
    setUserDetails(data);
    setUserId(data._id);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      getQuestionApi("Published");
    } else if (newValue === 2) {
      getQuestionApi("Pending");
    } else if (newValue === 3) {
      getQuestionApi("Rejected");
    } else if (newValue === 0) {
      getQuestionApi("");
    }
  };

  const getQuestionApi = (selectedStatus) => {
    setLoader(true);
    let url = `${URLS.question}?userid=${userId}`;

    if (selectedStatus !== "") {
      url = `${url}&status=${selectedStatus}`;
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
        setQuestionData(res.data);
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
                    questionCount={question.slNo}
                    createdDate={formatDate(question.createdAt)}
                    views={question.views}
                  />
                );
              })
            ) : (
              <NoDataAvailable />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <AskFatwasComponent /> */}
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
                  />
                );
              })
            ) : (
              <div>NO DATA </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
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
                  />
                );
              })
            ) : (
              <div>NO DATA </div>
            )}
            {/* <Profile /> */}
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
                  />
                );
              })
            ) : (
              <div>NO DATA </div>
            )}
          </TabPanel>
        </Box>
      )}
    </div>
  );
}
