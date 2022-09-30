import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./admin.fatwas.styles.scss";
import axios from "axios";
import { URLS } from "../../../config/urls.config";
import NoDataAvailable from "../../../components/NoDataAvailable";
import { formatDate } from "../../../utils/dateformat";
import { set } from "react-hook-form";
import Loader from "../../../components/common/Loader";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function Fatwas() {
  const [questionList, setQuestionList] = useState([]);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    getQuestionListApi();
  }, []);

  const getQuestionListApi = () => {
    setLoader(true);
    axios
      .get(URLS.question, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        console.log("res question===>>", data.data);
        setQuestionList(data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="admin-fatwas-section">
      <div className="fatwas-container">
        <div className="fatwas-row">
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Madhab" />}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Subcategory" />
              )}
            />
          </div>
        </div>
        <div className="fatwas-row second-row">
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Mufti" />}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Mustafthi" />
              )}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Language" />
              )}
            />
          </div>
          <div className="col-md-2">
            <Button variant="contained" className="form-btn" fullWidth>
              APPLY
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div className="table-section">
        <div className="table-row">
          <div className="col-md-6">
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
      <div className="main-table-section">
        <div className="main-table-row">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, marginTop: "1em" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Q ID</TableCell>
                  <TableCell>Mustafthi</TableCell>
                  <TableCell>Short Question</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Madhab</TableCell>
                  <TableCell>Mufthi</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {isLoader ? (
                <Loader />
              ) : (
                <TableBody>
                  {questionList?.length ? (
                    questionList?.map((question) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          onClick={() => navigate(`${"/admin/fatwasDetails"}`)}
                          key={question._id}
                        >
                          <TableCell component="th" scope="row">
                            {question._id}
                          </TableCell>
                          <TableCell>aaaaa</TableCell>
                          <TableCell>{question.short_question}</TableCell>
                          <TableCell>
                            {formatDate(question.createdAt)}
                          </TableCell>
                          <TableCell>{question.category.category}</TableCell>
                          <TableCell>{question.madhab.title}</TableCell>
                          <TableCell>{question.mufti}</TableCell>
                          <TableCell>
                            <span className="status">{question.status}</span>
                          </TableCell>
                          <TableCell>
                            <VisibilityIcon className="view-icon" />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <NoDataAvailable />
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
