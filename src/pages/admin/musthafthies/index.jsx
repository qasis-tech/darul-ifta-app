import React from "react";
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
import EditIcon from '@mui/icons-material/Edit';
import "./musthafthies.styles.scss";
export default function Musthafthies() {
  const navigate=useNavigate();

  return (
    <div className="musthafthies-section">
      <div className="musthafthies-container">
        <div className="musthafthies-row">
          <div className="col-md-5">
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
          <div className="col-md-1">
            <Button variant="contained"  onClick={() => navigate(`${'/admin/addMusthafthies'}`)}  className="add-btn" fullWidth>
              ADD
            </Button>
          </div>
        </div>
      </div>
      <div className="musthafthies-table-section">
        <div className="musthafthies-table-row">
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
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    #1234
                  </TableCell>
                  <TableCell>aaaaa</TableCell>
                  <TableCell>1234567890</TableCell>
                  <TableCell>user@gmail.com</TableCell>
                  <TableCell>
                    <EditIcon className="edit-icon"/>
                    <VisibilityIcon className="view-icon" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
