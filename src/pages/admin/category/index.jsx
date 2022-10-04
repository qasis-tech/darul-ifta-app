import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import { URLS } from "../../../config/urls.config";

import "./category.styles.scss";

import getCategoryListApi from "../../../services/getCategoryList";

export default function Categories() {
  const [isLoading, setLoader] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setLoader(true);
    getCategoryListApi()
      .then((res) => {
        setCategoryList(res?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
        setCategoryList([]);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="category-section">
      <div className="category-container">
        <div className="category-row">
          <div className="col-md-1">
            <Button
              variant="contained"
              onClick={() => navigate(`${"/admin/addCategories"}`)}
              className="add-btn"
              fullWidth
            >
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
                  {categoryList.map((category) => {
                    return (
                      <TableRow
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={category._id}
                      >
                        <TableCell>{category.category}</TableCell>

                        <TableCell>
                          {" "}
                          {category?.subCategory.map((subcategory) => {
                            return (
                              <Chip
                                key={subcategory._id}
                                label={subcategory.label}
                                variant="outlined"
                              />
                            );
                          })}
                        </TableCell>

                        <TableCell align="center">
                          <EditIcon className="edit-icon" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
