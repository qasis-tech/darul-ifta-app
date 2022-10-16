import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";

import "./article.styles.scss";

import { URLS } from "../../../config/urls.config";
import NoDataAvailable from "../../../components/NoDataAvailable";
import { formatDate } from "../../../utils/dateformat";
import Loader from "../../../components/common/Loader";

export default function Article() {
  const [articleData, setArticleData] = useState([]);
  const [isLoader, setLoader] = useState([]);

  useEffect(() => {
    getArticleApi();
  }, []);

  const getArticleApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.article}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        console.log("res Article", data);
        setLoader(false);
        setArticleData(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error article--", err);
        setArticleData([]);
      });
  };

  const navigate = useNavigate();
  return (
    <div className="article-section">
      <div className="article-container">
        <div className="article-row">
          <div className="col-md-1">
            <Button
              variant="contained"
              onClick={() => navigate(`${"/admin/addArticle"}`)}
              className="add-btn"
              fullWidth
            >
              ADD
            </Button>
          </div>
        </div>
      </div>
      <div className="article-table-section">
        <div className="table-container">
          <div className="table-row">
            {isLoader ? (
              <Loader skeleton />
            ) : (
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650, marginTop: "1em" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Sl.no</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Date of created</TableCell>
                      <TableCell>Date of published</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {articleData?.length ? (
                      articleData?.map((article, index) => {
                        return (
                          <TableRow
                            hover
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={article._id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{article.title}</TableCell>
                            <TableCell>
                              {formatDate(article.createdAt)}
                            </TableCell>
                            <TableCell>
                              {formatDate(article.updatedAt)}
                            </TableCell>
                            <TableCell>
                              <span className="published">Published</span>
                            </TableCell>
                            <TableCell align="center">
                              <EditIcon className="edit-icon" />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <NoDataAvailable />
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
  );
}
