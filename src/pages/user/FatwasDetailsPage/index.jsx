import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

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

export default function FatwasDetailsPage() {
  const { id } = useParams();
  const [questionDetails, setQuestionDetails] = useState(null);

  console.log("IDDDDDDD", id);

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
  }, []);

  return (
    <div className="question-details-section mt-5">
      <div className="container">
        <QuestionNumberComponent data={questionDetails} />
        <SingleQuestionComponent data={questionDetails} />
      </div>
      <PublishedDateComponent data={questionDetails} />
      <div className=" d-flex">
        <div className="container main-section">
          <div className="col">
            <SocialComponent />
          </div>
          <div className="col-md-9 details">
            <DetailedQuestionComponent data={questionDetails} />
            {/* <WrittenComponent data={questionDetails} /> */}
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
