import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FooterComponent from "../../../components/Footer";
import SingleQuestionComponent from "./SingleQuestion";
import QuestionNumberComponent from "./QuestionNumber";
import PublishedDateComponent from "./PublishedDate";
import DetailedQuestionComponent from "./DetailedQuestion";
import WrittenComponent from "./WrittenSection";
import RelatedFatwasComponent from "./RelatedFatwas";
import SocialComponent from "./Social";

import "./fatwas.details.styles.scss";
import getQuestionListApi from "../../../services/getQuestionsList";
import { Divider, Paper } from "@mui/material";

export default function FatwasDetailsPage() {
  const { id } = useParams();
  const [questionDetails, setQuestionDetails] = useState(null);

  useEffect(() => {
    if (id) {
      getQuestionListApi(`/${id}`)
        .then((res) => {
          console.log("res in getQuestionListApi Details ", res.data);
          setQuestionDetails(res?.data);
        })
        .catch((err) => {
          console.error(
            "getQuestionListApi Error in user/FatwasDetailsPage ",
            err
          );
        });
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="question-details-section mt-5">
      <div className="container">
        <QuestionNumberComponent data={questionDetails} />
        <Divider sx={{ marginY: 1 }} />
        <SingleQuestionComponent data={questionDetails} />
      </div>
      <div className="container">
        <PublishedDateComponent data={questionDetails} />
      </div>
      <div className=" d-flex mb-5 ">
        <div className="container main-section mt-2 bg-danger ">
          <div className="col-md-9 details d-flex">
            <SocialComponent />
            <div>
              <DetailedQuestionComponent data={questionDetails} />
              <WrittenComponent data={questionDetails} />
            </div>
          </div>
          <div className="col-md-3 related">
            <RelatedFatwasComponent data={questionDetails} />
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
