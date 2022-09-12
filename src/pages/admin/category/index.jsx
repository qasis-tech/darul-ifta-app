import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";

import "./category.styles.scss";
export default function Categories() {
  const navigate=useNavigate();
  return (
    <div className="category-section">
      <div className="category-container">
        <div className="category-row">
          <div className="col-md-1">
            <Button variant="contained"  onClick={() => navigate(`${'/admin/addCategories'}`)} className="add-btn" fullWidth>
              ADD
            </Button>
          </div>
        </div>
      </div>
      <div className="category-table-section">
        <div className="table-container">
          <div className="table-row">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, marginTop: "1em" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Main category</TableCell>
                    <TableCell>Subcategory</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>aaaaa</TableCell>
                    <TableCell>
                      {" "}
                      <Chip label="Chip Outlined" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <EditIcon className="edit-icon" />
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
