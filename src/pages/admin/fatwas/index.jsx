import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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

import Loader from "../../../components/common/Loader";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function Fatwas() {
  const [questionList, setQuestionList] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const [status, setStatus] = useState([
    { id: 1, title: "Pending" },
    { id: 2, title: "Rejected" },
    { id: 3, title: "Re Submitted" },
    { id: 4, title: "Received to Darul Ifta" },
    { id: 5, title: "Assigned Mufti" },
    { id: 6, title: "Mufti Answered" },
    { id: 7, title: "Completed Verification" },
    { id: 8, title: "Published" },
  ]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [languageList, setLanguageList] = useState([
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getQuestionListApi();
    getmadhabApi();
    getCatgoryApi();
  }, []);

  const getQuestionListApi = () => {
    setLoader(true);
    axios
      .get(URLS.question, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("res question===>>", res);
        // setQuestionList(data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const getmadhabApi = () => {
    setLoader(true);
    axios
      .get(URLS.madhab, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoader(false);
        console.log("res madhabb1111==>", res.data);
        setMadhabData(res.data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error madhab", err);
        setMadhabData([]);
      });
  };

  const getCatgoryApi = () => {
    axios
      .get(URLS.category, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        console.log("res category", data.data);
        setCategoryList(data.data);
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };

  const handleApply = () => {};

  const navigate = useNavigate();

  return (
    <div className="admin-fatwas-section">
      <form onSubmit={handleSubmit(handleApply)}>
        <div className="fatwas-container">
          <div className="fatwas-row">
            <div className="col-md-2">
              {status?.length ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={status}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, val) => setSelectedStatus(val)}
                  value={selectedStatus}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                      Active Status"
                      {...register("status")}
                    />
                  )}
                />
              ) : null}
            </div>
            <div className="col-md-2">
              {madhabData?.length ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={madhabData}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, val) => setSelectedMadhab(val)}
                  value={selectedMadhab}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                    Madhab"
                      {...register("madhab")}
                    />
                  )}
                />
              ) : null}
            </div>
            <div className="col-md-2">
              {categoryList?.length ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={categoryList}
                  getOptionLabel={(option) => option.category || ""}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  onChange={(e, val) => setSelectedCategory(val)}
                  value={selectedCategory}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
                    Category"
                      {...register("category")}
                    />
                  )}
                />
              ) : null}
            </div>
            <div className="col-md-2">
              <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={
                  selectedCategory?.subCategory?.length
                    ? selectedCategory?.subCategory
                    : []
                }
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(e, val) => setSelectedSubCategory(val)}
                value={selectedSubCategory}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Subcategories"
                    size="small"
                    {...register("subCategory")}
                  />
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
                renderInput={(params) => (
                  <TextField {...params} label="Mufti" />
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
                  <TextField {...params} label="Mustafthi" />
                )}
              />
            </div>
            <div className="col-md-2">
              {languageList?.length && (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  size="small"
                  options={languageList}
                  getOptionLabel={(option) => option.title || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, val) => setSelectedLanguage(val)}
                  value={selectedLanguage}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="
              Language"
                      {...register("language")}
                    />
                  )}
                />
              )}
            </div>
            <div className="col-md-2">
              <Button
                type="submit"
                variant="contained"
                className="form-btn"
                fullWidth
              >
                APPLY
              </Button>
            </div>
          </div>
        </div>
      </form>
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
