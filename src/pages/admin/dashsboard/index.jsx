import React, { useEffect, useState } from "react";

import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SnackBar from "../../../components/Snackbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import "./admin.home.styles.scss";

import getQuestionListApi from "../../../services/getQuestionsList";
import Loader from "../../../components/common/Loader";
import { formatDate } from "../../../utils/dateformat";
import NoDataAvailable from "../../../components/NoDataAvailable";
import CountTile from "./components/tiles";
import getGeneralsListApi from "../../../services/getGeneralList";

export default function Dashboard() {
  const [isLoading, setLoader] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [counteList, setCounteList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    titile: "",
  });

  const getGeneralsList = () => {
    setLoader(true);
    getGeneralsListApi((res, err) => {
      if (err) {
        console.log("Errr in get Generals API", err);
      } else setCounteList(res);
      setLoader(false);
    });
  };

  const getQuestions = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
        setQuestionList(res);
        setLoader(false);
      })
      .catch((err) => {
        console.log("Errr in get QUestion API", err);
        setQuestionList([]);
      });
  };

  useEffect(() => {
    getQuestions();
    getGeneralsList();
  }, []);

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <div className="admin-home-section">
          <div class="row justify-content-center">
            <CountTile
              titile="Mustafthi"
              Icon={() => <LanguageIcon className="fa" />}
              style="assMufthi"
              value={counteList?.musafthi}
            />
            <CountTile
              titile="Fatwas"
              Icon={() => <ListAltIcon className="fa" />}
              style="published"
              value={counteList?.fatwas}
            />
            <CountTile
              titile="Answered"
              Icon={() => <BorderColorIcon className="fa" />}
              style="mufthiAns"
              value={counteList?.answered}
            />
            <CountTile
              titile="Pendings"
              Icon={() => <QueryBuilderIcon className="fa" />}
              style="pending"
              value={counteList?.pending}
            />
            <CountTile
              titile="Rejected"
              Icon={() => <CloseIcon className="fa" />}
              style="rejected"
              value={counteList?.rejected}
            />
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
                        label="Question ID"
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
                                  visibility:
                                    searchInput !== "" ? "visible" : "hidden",
                                }}
                                onClick={() => setSearchInput("")}
                              >
                                <CloseIcon />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  // getQuestions(`?slNo=${searchInput}`)
                                  setError({
                                    visible: true,
                                    message: "Tetingggg",
                                    type: "success",
                                    title: "Test",
                                  })
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
                        <TableCell>Status</TableCell>
                        {/* <TableCell>Action</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {questionList?.data?.length ? (
                        questionList?.data?.map((items) => {
                          return (
                            <TableRow
                              hover
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {items?.slNo || "N/A"}
                              </TableCell>
                              <TableCell>{items?.user?.name}</TableCell>
                              <TableCell>{items?.short_question}</TableCell>
                              <TableCell>
                                {formatDate(items?.createdAt)}
                              </TableCell>
                              <TableCell>{items?.category?.category}</TableCell>
                              <TableCell>{items?.madhab?.title}</TableCell>
                              <TableCell>
                                <span
                                  className={
                                    items?.status === "Pending" ? "pending" : ""
                                  }
                                >
                                  {items?.status}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <NoDataAvailable />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                {errorPopup.visible && (
                  <SnackBar
                    visible={errorPopup.visible}
                    message={errorPopup.message}
                    type={errorPopup.type}
                    title={errorPopup.titile}
                    onClose={() => handleCloseError()}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
