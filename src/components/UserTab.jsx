import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Tabs, Tab, Typography, Box, TablePagination } from "@mui/material";

import QuestionContainer from "./QuestionContainer";
import { formatDate } from "../utils/dateformat";
import Loader from "./common/Loader";
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

const UserTab = ({ userLoginDetails, apiTriggeres }) => {
  const [value, setValue] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const STATUS = ["", "Published", "Pending", "Rejected"];

  useEffect(() => {
    getQuestionList(
      `?userid=${userLoginDetails?._id}&limit=5&skip=${page * rowsPerPage}`
    );
  }, []);

  useEffect(() => {
    if (apiTriggeres?.userGetQuesList) {
      getQuestionList(
        `?userid=${userLoginDetails?._id}&limit=5&skip=${page * rowsPerPage}`
      );
    }
  }, [apiTriggeres]);

  useEffect(() => {
    getQuestionList(
      `?userid=${userLoginDetails?._id}&limit=5&skip=${page * rowsPerPage}`
    );
  }, [page]);

  const getQuestionList = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        setLoader(false);
        if (params === `?userid=${userLoginDetails?._id}`) {
          setQuestionData(res);
        } else if (
          params === `?status=Published&userid=${userLoginDetails?._id}`
        ) {
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getQuestionList(
      newValue === 0
        ? `?userid=${userLoginDetails?._id}`
        : `?status=${STATUS[newValue]}&userid=${userLoginDetails?._id}`
    );
  };
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="user-tab-section">
      <Box sx={{ width: "80%" }}>
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
            {[0, 1, 2, 3, 4].map((item) => {
              return (
                <TabPanel value={value} index={item} key={item}>
                  {questionData?.data?.length ? (
                    questionData?.data?.map((question) => {
                      return (
                        <div>
                          <QuestionContainer
                            key={question._id}
                            shortquestion={question.short_question}
                            question={question.question}
                            questionCount={question.slNo}
                            createdDate={formatDate(question.createdAt)}
                            views={question.views}
                            data={question}
                          />
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            component="div"
                            count={questionData?.count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <NoDataAvailable noStyle noBg />
                  )}
                </TabPanel>
              );
            })}
          </>
        )}
      </Box>
      {/* <div className="pagination-section">
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={questionData?.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div> */}
    </div>
  );
};
const mapStateToProp = (state) => ({
  ...state,
});

export default connect(mapStateToProp)(UserTab);
