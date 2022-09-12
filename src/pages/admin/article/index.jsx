import React from "react";
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

import "./article.styles.scss";
export default function Article() {
  return (
    <div className="article-section">
      <div className="article-container">
        <div className="article-row">
          <div className="col-md-1">
            <Button variant="contained" className="add-btn" fullWidth>
              ADD
            </Button>
          </div>
        </div>
      </div>
      <div className="article-table-section">
        <div className="table-container">
            <div className="table-row">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, marginTop: "1em" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Sl.no</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date of credicted</TableCell>
                    <TableCell>Date of published</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell  align="center">Action</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>#123</TableCell>
                    <TableCell>aaaaa</TableCell>
                    <TableCell>23-04-2021</TableCell>
                    <TableCell>23-04-2021</TableCell>
                    <TableCell><span className="published">Published</span></TableCell>
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
