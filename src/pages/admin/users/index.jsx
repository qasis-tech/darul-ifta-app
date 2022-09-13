import React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from '@mui/icons-material/Edit';

import "./user.styles.scss";
export default function User() {
  const navigate=useNavigate();

  return (
    <div className="user-section">
      <div className="user-container">
        <div className="user-row">
          <div className="col-md-1">
            <Button variant="contained" className="add-btn"  onClick={() => navigate(`${'/admin/addUser'}`)} fullWidth>
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
                  <TableCell><span className="activestatus">Active</span></TableCell>
                  <TableCell>
                    <EditIcon className="edit-icon"/>
                    <VisibilityIcon className="view-icon" />
                  </TableCell>
                </TableRow>
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
                  <TableCell><span className="inactive">Inactive</span></TableCell>
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
    </div>
  );
}
