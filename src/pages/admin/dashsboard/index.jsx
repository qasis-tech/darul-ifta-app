import React, { useEffect, useState } from "react";

import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SnackBar from "../../../components/common/Snackbar";
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
import { useNavigate } from "react-router-dom";

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
    getGeneralsListApi()
      .then((res) => {
        setCounteList(res);
        setLoader(false);
      })
      .catch((err) => {
        console.error("Err in Generals", err);
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

  const navigate = useNavigate();

  return (
    <div>
      <div className="admin-home-section">
        <div className="row justify-content-center">
          <CountTile
            titile="Mustafthi"
            Icon={() => <LanguageIcon className="fa" />}
            style="assMufthi"
            value={counteList?.musafthi || "N/A"}
          />
          <CountTile
            titile="Fatwas"
            Icon={() => <ListAltIcon className="fa" />}
            style="published"
            value={counteList?.fatwas || "N/A"}
          />
          <CountTile
            titile="Answered"
            Icon={() => <BorderColorIcon className="fa" />}
            style="mufthiAns"
            value={counteList?.answered || "N/A"}
          />
          <CountTile
            titile="Pendings"
            Icon={() => <QueryBuilderIcon className="fa" />}
            style="pending"
            value={counteList?.pending || "N/A"}
          />
          <CountTile
            titile="Rejected"
            Icon={() => <CloseIcon className="fa" />}
            style="rejected"
            value={counteList?.rejected || "N/A"}
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
                      type="number"
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
                              onClick={() => {
                                getQuestions("");
                                setSearchInput("");
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                getQuestions(`?slNo=${searchInput}`)
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
              {isLoading ? (
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
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {questionList?.length ? (
                        questionList?.map((items) => {
                          return (
                            <TableRow
                              hover
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              onClick={() =>
                                navigate(
                                  `${"/admin/fatwasDetails"}/${items._id}`
                                )
                              }
                            >
                              <TableCell>{items?.slNo || "N/A"}</TableCell>
                              <TableCell>
                                {items?.user?.name || "N/A"}
                              </TableCell>
                              <TableCell>
                                {items?.short_question || "N/A"}
                              </TableCell>
                              <TableCell>
                                {items?.createdAt
                                  ? formatDate(items?.createdAt)
                                  : "N/A"}
                              </TableCell>
                              <TableCell>
                                {items?.category?.category || "N/A"}
                              </TableCell>
                              <TableCell>
                                {items?.madhab?.title || "N/A"}
                              </TableCell>
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
                        <TableRow>
                          <TableCell rowSpan={5} colSpan={2}>
                            <NoDataAvailable />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
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
    </div>
  );
}
