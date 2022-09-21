import React from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./admin.fatwas.styles.scss";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function Fatwas() {
  const navigate=useNavigate();

  return (
    <div className="admin-fatwas-section">
      <div className="fatwas-container">
        <div className="fatwas-row">
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Madhab" />}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Subcategory" />
              )}
            />
          </div>
        </div>
        <div className="fatwas-row second-row">
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Mafthi" />}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Mustafthi" />
              )}
            />
          </div>
          <div className="col-md-2">
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Language" />
              )}
            />
          </div>
          <div className="col-md-2">
            <Button variant="contained" className="form-btn" fullWidth>
              APPLY
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div className="table-section">
        <div className="table-row">
          <div className="col-md-6">
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
        </div>
      </div>
      <div className="main-table-section">
        <div className="main-table-row">
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
                  <TableCell >Created Date</TableCell>
                  <TableCell >Category</TableCell>
                  <TableCell>Madhab</TableCell>
                  <TableCell>Mufthi</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  onClick={() => navigate(`${'/admin/fatwasDetails'}`)} 
                >
                  <TableCell component="th" scope="row">
                    #1234
                  </TableCell>
                  <TableCell>aaaaa</TableCell>
                  <TableCell>aaaaa</TableCell>
                  <TableCell>23-07-2021</TableCell>
                  <TableCell >Social Matters</TableCell>
                  <TableCell>dddddd</TableCell>
                  <TableCell >N.A</TableCell>
                  <TableCell >
                    <span className="status">Received</span>
                  </TableCell>
                  <TableCell>
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
