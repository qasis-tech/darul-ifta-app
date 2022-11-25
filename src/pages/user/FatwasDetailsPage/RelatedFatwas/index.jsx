import { Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../config/urls.config";
import getQuestionListApi from "../../../../services/getQuestionsList";
import "./related.fatwas.styles.scss";

import routerList from "../../../../routes/routerList";
import NoDataAvailable from "../../../../components/NoDataAvailable";
export default function RelatedFatwas({ data }) {
  const [questionList, setQuestionList] = useState([]);
  const [isLoader, setLoader] = useState(false);

  const subCategoryLabel = data?.sub_category?.map((sub) => sub?.label)[0];

  console.log("subCategoryLabel ==", subCategoryLabel);

  useEffect(() => {
    getQuestionList(
      `?subCategory=${encodeURIComponent(subCategoryLabel)}&limit=3`
    );
  }, []);

  const getQuestionList = (params) => {
    setLoader(true);
    getQuestionListApi(params)
      .then((res) => {
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

  const navigate = useNavigate();

  return (
    <div className="related-fatwas-section mt-3 pb-2">
      <div className="related-fatwas-container">
        <div className="col-md-12 main-head">
          <Typography className="heading">Related Fatwas</Typography>
        </div>
        {questionList?.length ? (
          questionList?.map((slicedques) => {
            return (
              <div key={slicedques?._id} className="container">
                <div className="col-md-12 sub-details my-3  py-2 px-2">
                  <Typography className="title">
                    {slicedques?.short_question}
                  </Typography>
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
                        label="ReadMore"
                        className="id-button"
                        onClick={() =>
                          navigate(`${routerList.user.fatwasDetailsPage}`, {
                            state: { data: slicedques },
                          })
                        }
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
