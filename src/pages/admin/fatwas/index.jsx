import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  TextField,
  Autocomplete,
  Button,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

import "./admin.fatwas.styles.scss";

import { URLS } from "../../../config/urls.config";
import NoDataAvailable from "../../../components/NoDataAvailable";
import { formatDate } from "../../../utils/dateformat";
import Loader from "../../../components/common/Loader";
import getQuestionListApi from "../../../services/getQuestionsList";

export default function Fatwas() {
  const [questionList, setQuestionList] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [madhabData, setMadhabData] = useState([]);
  const [selectedMadhab, setSelectedMadhab] = useState([]);
  const status = [
    { id: 1, title: "Pending" },
    { id: 2, title: "Rejected" },
    { id: 3, title: "Re Submitted" },
    { id: 4, title: "Received to Darul Ifta" },
    { id: 5, title: "Assigned Mufti" },
    { id: 6, title: "Mufti Answered" },
    { id: 7, title: "Completed Verification" },
    { id: 8, title: "Published" },
  ];

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const languageList = [
    { id: 1, title: "English" },
    { id: 2, title: "Malayalam" },
    { id: 3, title: "Arabic" },
    { id: 4, title: "Urdu" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [mufthiData, setMufthiData] = useState([]);
  const [selectedMufthi, setSelectedMufthi] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getQuestionList();
    getmadhabApi();
    getCatgoryApi();
    getMufthiApi();
    getUserApi();
  }, []);

  const getQuestionList = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        // if (res?.success) {
        //   setSelectedMadhab("");
        //   setSelectedStatus("");
        //   setSelectedCategory("");
        //   setSelectedSubCategory("");
        //   setSelectedLanguage("");
        //   setSelectedMufthi("");
        //   setSelectedUserData("");
        // }
        setLoader(false);
        setQuestionList(res);
      })
      .catch((err) => {
        console.error("Error in getQuestionListApi", err);
        setLoader(false);
        setQuestionList([]);
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
        setMadhabData(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error madhab", err);
        setMadhabData([]);
      });
  };

  const getCatgoryApi = () => {
    setLoader(true);
    axios
      .get(URLS.category, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        setCategoryList(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
        setCategoryList([]);
      });
  };

  const getMufthiApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}?userType=Mufthi`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        setMufthiData(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
        setMufthiData([]);
      });
  };

  const getUserApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}?userType=User`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        setUserData(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error userr--", err);
        setUserData([]);
      });
  };

  const handleApply = () => {
    let params = "";
    if (selectedStatus?.title) params += `status=${selectedStatus?.title}`;
    if (selectedMadhab?.title) params += `-madhab=${selectedMadhab?.title}`;
    if (selectedCategory?.category)
      params += `-category=${selectedCategory?.category}`;
    if (selectedSubCategory?.label)
      params += `-subCategory=${selectedSubCategory?.label}`;
    if (selectedMufthi?._id) params += `-muftiId=${selectedMufthi?._id}`;
    if (selectedUserData?._id) params += `-userid=${selectedUserData?._id}`;
    if (selectedLanguage?.title)
      params += `-language=${selectedLanguage?.title}`;
    if (searchInput) params += `-search=${searchInput}`;

    if (params[0] === "-") {
      params = params.charAt(0).replace("-", "?") + params.slice(1);
    } else if (params[0] !== "-") {
      params = "?" + params;
    }
    params = params.replace(/-/g, "&");
    getQuestionList(params);
  };

  const navigate = useNavigate();

  return (
    <div className="admin-fatwas-section">
      <>
        <form onSubmit={handleSubmit(handleApply)}>
          <div className="fatwas-container shadow-sm">
            <div className="fatwas-row">
              <div className="col-md-2">
                {status?.length && (
                  <Autocomplete
                    disablePortal
                    id="status"
                    size="small"
                    options={status}
                    getOptionLabel={(option) => option?.title || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(e, val) => setSelectedStatus(val)}
                    value={selectedStatus}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        {...register("status")}
                      />
                    )}
                  />
                )}
              </div>
              <div className="col-md-2">
                {madhabData?.length ? (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={madhabData}
                    getOptionLabel={(option) => option?.title || []}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) => setSelectedMadhab(val)}
                    value={selectedMadhab || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Madhab"
                        {...register("madhab")}
                      />
                    )}
                  />
                ) : (
                  <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={[]}
                    renderInput={(params) => (
                      <TextField {...params} label="Madhab" />
                    )}
                  />
                )}
              </div>
              <div className="col-md-2">
                {categoryList?.length ? (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={categoryList}
                    getOptionLabel={(option) => option?.category || ""}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) => setSelectedCategory(val)}
                    value={selectedCategory || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="
                    Category"
                        {...register("category")}
                      />
                    )}
                  />
                ) : (
                  <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={[]}
                    renderInput={(params) => (
                      <TextField {...params} label="Category" />
                    )}
                  />
                )}
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
                  getOptionLabel={(option) => option?.label || ""}
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
                {mufthiData?.length ? (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={mufthiData || null}
                    getOptionLabel={(option) => option?.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) => {
                      setSelectedMufthi(val);
                    }}
                    value={selectedMufthi || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Mufthi"
                        {...register("mufthi")}
                      />
                    )}
                  />
                ) : (
                  <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={[]}
                    renderInput={(params) => (
                      <TextField {...params} label="Mufthi" />
                    )}
                  />
                )}
              </div>
              <div className="col-md-2">
                {userData?.length ? (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={userData}
                    getOptionLabel={(option) => option?.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) => setSelectedUserData(val)}
                    value={selectedUserData || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="
                      Mustafthi"
                        {...register("mustafthi")}
                      />
                    )}
                  />
                ) : (
                  <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={[]}
                    renderInput={(params) => (
                      <TextField {...params} label="Mustafthi" />
                    )}
                  />
                )}
              </div>
              <div className="col-md-2">
                {languageList?.length && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    options={languageList}
                    getOptionLabel={(option) => option?.title || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(e, val) => setSelectedLanguage(val)}
                    value={selectedLanguage}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Language"
                        {...register("language")}
                      />
                    )}
                  />
                )}
              </div>
              <div className="col-md-2 d-flex justify-content-between">
                <div className="col-md-5">
                  <Button
                    type="submit"
                    variant="contained"
                    className="add-btn"
                    fullWidth
                  >
                    Clear
                  </Button>
                </div>
                <div className="col-md-5">
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
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                className="search-btn"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          visibility: searchInput !== "" ? "visible" : "hidden",
                        }}
                        onClick={() =>{getQuestionList(""); setSearchInput("")}}
                      >
                        <CloseIcon />
                      </IconButton>
                      <IconButton
                        // onClick={() => handleApply(`?search=${searchInput}`)}
                        onClick={() =>
                          getQuestionList(`?search=${searchInput}`)
                        }
                      >
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
            {isLoader ? (
              <Loader skeleton />
            ) : (
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

                  <TableBody>
                    {questionList?.length ? (
                      questionList?.map((question) => {
                        return (
                          <TableRow
                            hover
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            onClick={() =>
                              navigate(`${"/admin/fatwasDetails"}`)
                            }
                            key={question._id}
                          >
                            <TableCell component="th" scope="row">
                              {question.slNo}
                            </TableCell>
                            <TableCell>{question.user.name}</TableCell>
                            <TableCell>{question.short_question}</TableCell>
                            <TableCell>
                              {formatDate(question.createdAt)}
                            </TableCell>
                            <TableCell>{question.category.category}</TableCell>
                            <TableCell>{question.madhab.title}</TableCell>
                            <TableCell>
                              {questionList?.mufti ? (
                                <span>{question.mufti}</span>
                              ) : (
                                <span>N/A</span>
                              )}
                            </TableCell>
                            <TableCell>
                            <span
                                  className={
                                    question?.status === "Pending"
                                      ? "pending"
                                      : question?.status === "Rejected"
                                      ? "rejected"
                                      : question?.status === "Re Submitted"
                                      ? "reSUbmitted"
                                      : question?.status ===
                                        "Received to Darul Ifta"
                                      ? "recievedToDI"
                                      : question?.status === "Assigned Mufti"
                                      ? "assMufthi"
                                      : question?.status === "Mufti Answered"
                                      ? "mufthiAns"
                                      : question?.status ===
                                        "Completed Verification"
                                      ? "completeVerification"
                                      : question?.status === "Published"
                                      ? "published"
                                      : ""
                                  }
                                >
                                  {question?.status}
                                </span>
                              {/* <span className="status">{question.status}</span> */}
                            </TableCell>
                            <TableCell>
                              <VisibilityIcon className="view-icon" />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2}>
                          <NoDataAvailable />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
