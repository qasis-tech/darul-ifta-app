import React, { useState, useEffect } from "react";
import axios from "axios";
import { URLS } from "../config/urls.config";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountHomeComponent from "./AccountHomeComponent";
import AskFatwasComponent from "../pages/user/Accounts/askFatwas";
import Profile from "../pages/user/Accounts/profile";
import "../pages/user/Accounts/home/account.home.styles.scss";
import QuestionContainer from "./QuestionContainer";
import { formatDate } from "../utils/dateformat";
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getQuestionApi();
  }, []);

  const getQuestionApi = () => {
    axios
      .get(URLS.question, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("resques2222>>>", res);
        setQuestionData(res.data.data);
      })
      .catch((err) => {
        console.log("error quesss", err);
      });
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
        <TabPanel value={value} index={0}>
          {/* <AccountHomeComponent/> */}
          {questionData.map((question) => {
            return (
              <div className="container">
                <QuestionContainer
                  shortquestion={question.short_question}
                  question={question.question}
                  createdDate={formatDate(question.createdAt)}
                  views={question.views}
                  writtenby={question.mufti}
                />
              </div>
            );
          })}

          {/* <span>001</span> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AskFatwasComponent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <Profile /> */}
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Box>
    </div>
  );
}
