import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import "./musthafthies.styles.scss";
import { useState } from "react";
import axios from "axios";
import routerList from "../../../routes/routerList";
import { URLS } from "../../../config/urls.config";
import NoDataAvailable from "../../../components/NoDataAvailable";
import Loader from "../../../components/common/Loader";
export default function Musthafthies() {
  const [userType, setUserType] = useState("Mufthi");
  const [isLoading, setLoader] = useState(false);
  const [mufthiData, setMufthiData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getMufthiApi();
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      getMufthiApi();
    }
  }, [searchInput]);

  const getMufthiApi = () => {
    setLoader(true);
    let URL =
      searchInput !== ""
        ? `${URLS.user}${URLS.signup}?userType=${userType}&search=${searchInput}`
        : `${URLS.user}${URLS.signup}?userType=${userType}`;
    axios
      .get(URL, {
        "Content-Type": "application/json",
      })
      .then(({ data }) => {
        setLoader(false);
        console.log("res mufthiss1111", data);
        setMufthiData(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
        setMufthiData([]);
      });
  };
  const navigate = useNavigate();

  return (
    <div className="musthafthies-section">
      <div className="musthafthies-container">
        <div className="musthafthies-row">
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
                    <IconButton onClick={() => getMufthiApi()}>
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
              onClick={() => navigate(`${"/admin/addMufthi"}`)}
              className="add-btn"
              fullWidth
            >
              ADD
            </Button>
          </div>
        </div>
      </div>
      <div className="musthafthies-table-section">
        <div className="musthafthies-table-row">
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
                    <TableCell>ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Mobile No.</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mufthiData?.length ? (
                    mufthiData?.map((mufti) => {
                      return (
                        <TableRow
                          hover
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          key={mufti._id}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={() =>
                              navigate(
                                `${routerList.admin.admin}/${routerList.admin.mufthiDetails}/${mufti._id}`
                              )
                            }
                          >
                            {mufti._id}
                          </TableCell>
                          <TableCell>{mufti.name}</TableCell>
                          <TableCell>{mufti.phone}</TableCell>
                          <TableCell>{mufti.email}</TableCell>
                          <TableCell>
                            <EditIcon
                              className="edit-icon"
                              onClick={() =>
                                navigate(
                                  `${routerList.admin.admin}/${routerList.admin.mufthiDetails}/${mufti._id}`
                                )
                              }
                            />
                            <VisibilityIcon className="view-icon" />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <NoDataAvailable noStyle />
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
  );
}
