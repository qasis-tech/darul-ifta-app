import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";

import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Paper,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import NoDataAvailable from "../../../components/NoDataAvailable";
import RouterList from "../../../routes/routerList";

import "./user.styles.scss";

export default function User() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [roles, setRoles] = useState("User");
  const [searchInput, setSearchInput] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getUserListApi();
  }, [page]);

  useEffect(() => {
    if (searchInput === "") {
      getUserListApi();
    }
  }, [searchInput]);

  const getUserListApi = () => {
    setLoader(true);
    let params = "";
    if (searchInput !== "") {
      params = `?userType=${roles}&search=${searchInput}&skip=${
        page * rowsPerPage
      }&limit=10`;
    } else {
      params = `?userType=${roles}&skip=${page * rowsPerPage}&limit=10`;
    }
    axios
      .get(`${URLS.user}${URLS.signup}${params}`)
      .then((data) => {
        setLoader(false);
        console.log("res userss1111", data);
        setUserCount(data?.count);
        setUserData(data?.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error login", err);
      });
  };

  const handleChangePage = (e, newPage) => setPage(newPage);

  return (
    <div className="user-section ">
      <div className="user-container">
        <div className="user-row">
          <div className="col-md-5">
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
                      onClick={() => {
                        setSearchInput("");
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={() => getUserListApi()}>
                      <SearchIcon
                        sx={{
                          visibility: searchInput !== "" ? "visible" : "hidden",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="col-md-1">
            <Button
              variant="contained"
              className="add-btn"
              onClick={() => navigate(`${"/admin/addUser"}`)}
              fullWidth
            >
              ADD
            </Button>
          </div>
        </div>
      </div>
      <div className="user-table-section">
        <div className="user-table-container">
          <div className="user-table-row">
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
                      <TableCell>Name</TableCell>
                      <TableCell>Display Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>USer Type</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData.length ? (
                      userData.map((user) => {
                        console.log("filterrrr", user);
                        return (
                          <TableRow
                            hover
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={user._id}
                            onClick={() => navigate(`${user?._id}`)}
                          >
                            <TableCell>
                              <span>{user?.name || "N/A"}</span>
                            </TableCell>
                            <TableCell>
                              <span>{user?.display_title || "N/A"}</span>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{startCase(user?.user_type)}</TableCell>
                            <TableCell>
                              {user.user_status === null ? (
                                <span>N/A</span>
                              ) : (
                                <span className="activestatus">
                                  {user.user_status}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <div className="d-flex justify-content-center align-items-center">
                            <NoDataAvailable noStyle noBg />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={userCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                />
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
