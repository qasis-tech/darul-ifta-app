import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import NoDataAvailable from "../../../components/NoDataAvailable";

import "./user.styles.scss";

export default function User() {
  const [userData, setUserData] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [roles, setRoles] = useState("User");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getUserListApi();
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      getUserListApi();
    }
  }, [searchInput]);

  const getUserListApi = () => {
    setLoader(true);
    let URL =
      searchInput !== ""
        ? `${URLS.user}${URLS.signup}?userType=${roles}&search=${searchInput}`
        : `${URLS.user}${URLS.signup}?userType=${roles}`;
    axios
      .get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        console.log("res userss1111", data);
        setUserData(data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error login", err);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="user-section">
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
                      <SearchIcon />
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
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, marginTop: "1em" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Display Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                {isLoader ? (
                  <Loader />
                ) : (
                  <TableBody>
                    {userData.length ? (
                      userData.map((user) => {
                        return (
                          <TableRow
                            hover
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={user._id}
                          >
                            <TableCell component="th" scope="row">
                              {user._id}
                            </TableCell>
                            <TableCell>
                              {user.name === null ? (
                                <span>N/A</span>
                              ) : (
                                <span>{user.name}</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {user.display_title === null ? (
                                <span>N/A</span>
                              ) : (
                                <span>{user.display_title}</span>
                              )}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {user.user_status === null ? (
                                <span>N/A</span>
                              ) : (
                                <span className="activestatus">
                                  {user.user_status}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <EditIcon className="edit-icon" />
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
    </div>
  );
}
