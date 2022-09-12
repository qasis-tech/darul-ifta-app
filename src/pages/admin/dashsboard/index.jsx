import React from "react";
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./admin.home.styles.scss";

export default function Dashboard() {
  return (
    <div>
      <div className="admin-home-section">
        <div class="row justify-content-center">
          <div class="col-lg-2 col-md-2 col-sm-3">
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
          </div>
          <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 col-sm-12 d-flex align-items-center">
                    <div class="icon-big text-center">
                      <ListAltIcon className="fs-1" />
                      {/* <i class="fa fa-list-alt fa-3x" aria-hidden="true"></i> */}
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
          </div>
          <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 d-flex align-items-center">
                    <div class="icon-big text-center">
                      <BorderColorIcon className="text-success fs-1" />
                      {/* <i class="fa fa-edit fa-3x text-success"></i> */}
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
          </div>
          <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 d-flex align-items-center">
                    <div class="icon-big text-center text-warning">
                      <QueryBuilderIcon className="fs-1 icon-warning" />
                      {/* <i class="fa fa-clock-o fa-3x icon-warning"></i> */}
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
          </div>
          <div class="col-lg-2 col-md-2 col-sm-3">
            <div class="card card-stats shadow border roundeded">
              <div class="card-body">
                <div class="row">
                  <div class="col-5 col-md-4 d-flex align-items-center">
                    <div class="icon-big text-center icon-warning">
                      <CloseIcon className="text-danger fs-1" />
                      {/* <i class="fa fa-close fa-3x text-danger"></i> */}
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
          </div>
        </div>
        <div className="table-section">
          <div className="table-row">
            <div className="col-md-12">
              <TableContainer component={Paper}>
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
                <Table sx={{ minWidth: 650,marginTop:"1em" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Q ID</TableCell>
                      <TableCell>Mustafthi</TableCell>
                      <TableCell>Short Question</TableCell>
                      <TableCell align="right">Created Date</TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="right">Madhab</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        #1234
                      </TableCell>
                      <TableCell>aaaaa</TableCell>
                      <TableCell>aaaaa</TableCell>
                      <TableCell align="right">23-07-2021</TableCell>
                      <TableCell align="right">Social Matters</TableCell>
                      <TableCell align="right">dddddd</TableCell>
                      <TableCell align="right"><span className="status">Received</span></TableCell>
                      <TableCell align="right"><VisibilityIcon className="view-icon"/></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
