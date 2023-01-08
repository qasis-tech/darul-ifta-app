import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import SearchIcon from "@mui/icons-material/Search";
import SnackBar from "../../../components/common/Snackbar";
import Tooltip from "@mui/material/Tooltip";
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
import routerList from "../../../routes/routerList";

export default function Dashboard() {
  const [isLoading, setLoader] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [counteList, setCounteList] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getQuestions("?updatedDate=DESC");
    getGeneralsList();
  }, []);

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
        setLoader(false);
        setQuestionList(res.data);
      })
      .catch((err) => {
        console.log("Errr in get QUestion API", err);
        setQuestionList([]);
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
            custStyle={"assMufthi"}
            value={counteList?.musafthi || "N/A"}
          />
          <CountTile
            titile="Fatwas"
            Icon={() => <ListAltIcon className="fa" />}
            custStyle="published"
            value={counteList?.total_fatwas || "N/A"}
          />
          <CountTile
            titile="Answered"
            Icon={() => <BorderColorIcon className="fa" />}
            custStyle="mufthiAns"
            value={counteList?.answered || "N/A"}
          />
          <CountTile
            titile="Pending"
            Icon={() => <QueryBuilderIcon className="fa" />}
            custStyle="pending"
            value={counteList?.pending || "N/A"}
          />
          <CountTile
            titile="Rejected"
            Icon={() => <CloseIcon className="fa" />}
            custStyle="rejected"
            value={counteList?.rejected || "N/A"}
          />
        </div>
        <div className="table-section mt-2">
          <div className="table-row">
            <div className="col-md-12">
              <div className="heading-container">
                <div className="heading-row">
                  <div className="col-md-6">
                    <h6>Latest Fatwas</h6>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">
                    <TextField
                      label="Question ID"
                      placeholder="Question ID (only numbers)"
                      size="small"
                      fullWidth
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
                                getQuestions("?updatedDate=DESC");
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
                              <SearchIcon
                                sx={{
                                  visibility:
                                    searchInput !== "" ? "visible" : "hidden",
                                }}
                              />
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
                <TableContainer component={Paper} marginTop={2}>
                  <Table
                    sx={{ minWidth: 650, marginTop: "1em" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Q ID</TableCell>
                        <TableCell>Mustafthi</TableCell>
                        <TableCell>Short Question</TableCell>
                        <TableCell>Updated Date</TableCell>
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
                              key={items?._id}
                              hover
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              onClick={() =>
                                navigate(
                                  `${routerList?.admin?.fatwasDetails}/${items?.slNo}`,
                                  {
                                    state: items,
                                  }
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
                                {items?.updatedAt
                                  ? formatDate(items?.updatedAt)
                                  : "N/A"}
                              </TableCell>
                              <TableCell>
                                {items?.category[0]?.category || "N/A"}
                              </TableCell>
                              <TableCell>
                                {items?.madhab?.title || "N/A"}
                              </TableCell>
                              <TableCell>
                                <Tooltip title={items?.status} arrow>
                                  <span
                                    className={
                                      items?.status === "Pending"
                                        ? "pending fatwa-status"
                                        : items?.status === "Rejected"
                                        ? "rejected fatwa-status"
                                        : items?.status === "Re Submitted"
                                        ? "reSUbmitted fatwa-status"
                                        : items?.status ===
                                          "Received to Darul Ifta"
                                        ? "recievedToDI fatwa-status"
                                        : items?.status === "Assigned Mufti"
                                        ? "assMufthi fatwa-status"
                                        : items?.status === "Mufti Answered"
                                        ? "mufthiAns fatwa-status"
                                        : items?.status ===
                                          "Completed Verification"
                                        ? "completeVerification fatwa-status"
                                        : items?.status === "Published"
                                        ? "published fatwa-status"
                                        : ""
                                    }
                                  >
                                    {items?.status}
                                  </span>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ minHeight: "80px" }}
                            >
                              <NoDataAvailable noStyle noBg />
                            </div>
                          </TableCell>
                        </TableRow>
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
