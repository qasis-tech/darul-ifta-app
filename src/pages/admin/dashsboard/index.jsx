import React, { useEffect } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import PendingIcon from "@mui/icons-material/Pending";
import DashboardPage from "./mainContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./admin.home.styles.scss";
import getQuestionListApi from "../../../services/getQuestionsList";
import { useState } from "react";
import Loader from "../../../components/common/Loader";

export default function Dashboard() {
  const [isLoading, setLoader] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  const getQuestions = () => {
    setLoader(true);
    getQuestionListApi((res) => {
      console.log("res, loading", res);
      setQuestionList(res);
      setLoader(false);
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div>
      <div className="admin-home-section">
        <div class="row justify-content-center">
          {/* <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 col-sm-12 d-flex align-items-center">
                    <div class="icon-big text-center text-warning">
                      <LanguageIcon className="fs-1 icon-warning" />
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category fs-6 fw-bold">Mastafthi</p>
                      <p class="card-title fs-5 fw-bold">250 </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div class="col-lg-2 col-sm-6">
            <div class="circle-tile">
              <a href="#">
                <div class="circle-tile-heading assMufthi">
                  <LanguageIcon className="fa" />
                </div>
              </a>
              <div class="circle-tile-content assMufthi">
                <div class="circle-tile-description text-faded">Mastafthi</div>
                <div class="circle-tile-number text-faded">
                  250
                  <span id="sparklineA"></span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-2 col-sm-6">
            <div class="circle-tile">
              <a href="#">
                <div class="circle-tile-heading published">
                  <ListAltIcon className="fa" />
                </div>
              </a>
              <div class="circle-tile-content published">
                <div class="circle-tile-description text-faded">Fatwas</div>
                <div class="circle-tile-number text-faded">
                  67
                  <span id="sparklineA"></span>
                </div>
              </div>
            </div>
          </div>

          {/* 
          <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 col-sm-12 d-flex align-items-center">
                    <div class="icon-big text-center">
                      <ListAltIcon className="fs-1" />
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category fs-6 fw-bold">Fatwas</p>
                      <p class="card-title fs-5 fw-bold">67 </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div class="col-lg-2 col-sm-6">
            <div class="circle-tile">
              <a href="#">
                <div class="circle-tile-heading mufthiAns">
                  <BorderColorIcon className="fa" />
                </div>
              </a>
              <div class="circle-tile-content mufthiAns">
                <div class="circle-tile-description text-faded">Answered</div>
                <div class="circle-tile-number text-faded">
                  2<span id="sparklineA"></span>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 d-flex align-items-center">
                    <div class="icon-big text-center">
                      <BorderColorIcon className="text-success fs-1" />
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category fs-6 fw-bold">Answered</p>
                      <p class="card-title fs-5 fw-bold">2 </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div class="col-lg-2 col-sm-6">
            <div class="circle-tile">
              <a href="#">
                <div class="circle-tile-heading pending">
                  <QueryBuilderIcon className="fa" />
                </div>
              </a>
              <div class="circle-tile-content pending">
                <div class="circle-tile-description text-faded">Pendings</div>
                <div class="circle-tile-number text-faded">
                  34<span id="sparklineA"></span>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 d-flex align-items-center">
                    <div class="icon-big text-center text-warning">
                      <QueryBuilderIcon className="fs-1 icon-warning" />
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category fs-6 fw-bold">Pendings</p>
                      <p class="card-title fs-5 fw-bold">34</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <div class="col-lg-2 col-sm-6">
            <div class="circle-tile">
              <a href="#">
                <div class="circle-tile-heading rejected">
                  <CloseIcon className="fa" />
                </div>
              </a>
              <div class="circle-tile-content rejected">
                <div class="circle-tile-description text-faded">Rejected</div>
                <div class="circle-tile-number text-faded">
                  23<span id="sparklineA"></span>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 d-flex align-items-center">
                    <div class="icon-big text-center icon-warning">
                      <CloseIcon className="text-danger fs-1" />
                    </div>
                  </div>
                  <div class="col-7 col-md-8">
                    <div class="numbers">
                      <p class="card-category fs-6 fw-bold">Rejected</p>
                      <p class="card-title fs-5 fw-bold">23 </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="table-section">
          <div className="table-row">
            <div className="col-md-12">
              <div className="heading-container">
                <div className="heading-row">
                  <div className="col-md-2">
                    <h6>Latest Fatwas</h6>
                  </div>
                  <div className="col-md-10">
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
                  </div>
                </div>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, marginTop: "1em" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Sl.No</TableCell>
                        <TableCell>Mustafthi</TableCell>
                        <TableCell>Short Question</TableCell>
                        <TableCell>Created Date</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Madhab</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {questionList?.data?.length ? (
                        questionList?.data?.map((items) => {
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {items?.slNo || "N/A"}
                              </TableCell>
                              <TableCell>{items?.user}</TableCell>
                              <TableCell>aaaaa</TableCell>
                              <TableCell>23-07-2021</TableCell>
                              <TableCell>Social Matters</TableCell>
                              <TableCell>dddddd</TableCell>
                              <TableCell>
                                <span className="status">Received</span>
                              </TableCell>
                              <TableCell>
                                <VisibilityIcon className="view-icon" />
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <div>no data</div>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
