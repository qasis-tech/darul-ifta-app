import { Chip, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URLS } from "../../../../config/urls.config";
import getQuestionListApi from "../../../../services/getQuestionsList";
import "./related.fatwas.styles.scss";

import routerList from "../../../../routes/routerList";
import NoDataAvailable from "../../../../components/NoDataAvailable";
import { CollectionsOutlined } from "@mui/icons-material";
export default function RelatedFatwas({ data }) {
  const [questionList, setQuestionList] = useState([]);
  const [isLoader, setLoader] = useState(false);
  // const [limit,setLimit]=useState(3)

  const subCategoryLabel = data?.sub_category?.map((sub) => sub?.label)[0];

  console.log("subCategoryLabel ==", subCategoryLabel);

  useEffect(() => {
    // getQuestionList(
    //   `?status=Published&subCategory=${encodeURIComponent(
    //     subCategoryLabel
    //   )}&limit=3`
    // );
     getQuestionList()
  }, []);

  const getQuestionList = () => {
    setLoader(true);
    // getQuestionListApi()
    let params = `?status=Published&limit=3&skip=3`;
    console.log("parammmm",params)
    axios
      .get(`${URLS.question}${params}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("responseeeeeeeeee=====>", res);
        setLoader(false);

        setQuestionList(
          res.data
            ?.filter((obj) => obj?._id !== data?._id)
            .map((items) => items)
        );
      })
      .catch((err) => {
        console.error("Error in getQuestionListApi", err);
        setLoader(false);
        setQuestionList([]);
      });
  };
  console.log("1212121212121212==========>", questionList);
  const navigate = useNavigate();

  return (
    <div className="related-fatwas-section mt-3 mb-2 pb-2">
      <div className="related-fatwas-container">
        <div className="col-md-12 main-head">
          <Typography className="heading">Related Fatwas</Typography>
        </div>
        {questionList?.length ? (
          questionList?.map((slicedques) => {
            console.log("sliced==========>", questionList);
            return (
              <div key={slicedques?._id} className="container">
                <div className="col-md-12 sub-details my-3  py-2 px-2">
                  <Grid item xs={12} md={12} className="line-clamp">
                    <Typography variant="paragraph" className="title">
                      {slicedques?.short_question}
                    </Typography>
                  </Grid>
                  <div className="row d-flex sub-btn justify-content-between mt-2 pb-1">
                    <div className="col-md-6">
                      <Chip
                        label={`Q${slicedques?.slNo
                          ?.toString()
                          ?.padStart(3, "0")}`}
                        className="id-button"
                      />
                    </div>
                    <div className="col-md-6">
                      <Chip
                        label="Read More"
                        className="id-button"
                        onClick={() =>
                          navigate(
                            `${routerList.user.fatwasDetailsPage}/${slicedques?.slNo}`
                          )
                        }
                        //  {
                        //   state: { data: slicedques },
                        // })
                        // }
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "80px" }}
          >
            <NoDataAvailable noStyle noBg text style={{ color: "#235775" }} />
          </div>
        )}
      </div>
    </div>
  );
}
