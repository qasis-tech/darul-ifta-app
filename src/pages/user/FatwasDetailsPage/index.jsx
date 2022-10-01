import React from "react";
import FooterComponent from "../../../components/Footer";
import SingleQuestionComponent from "./SingleQuestion";
import QuestionNumberComponent from "./QuestionNumber";
import PublishedDateComponent from "./PublishedDate";
import DetailedQuestionComponent from "./DetailedQuestion";
import WrittenComponent from "./WrittenSection";
import RelatedFatwasComponent from "./RelatedFatwas";
import SocialComponent from "./Social";
import "./fatwas.details.styles.scss";
export default function FatwasDetailsPage() {
  return (
    <div className="question-details-section mt-5">
      <div className="container">
        <QuestionNumberComponent />
        <SingleQuestionComponent />
      </div>
      <PublishedDateComponent />
      <div className="main-section">
        <div className="col">
          <SocialComponent />
        </div>
        <div className="">
          <div className="col details">
            <DetailedQuestionComponent />
            <WrittenComponent />
          </div>
        </div>
        <div className="col related">
          <RelatedFatwasComponent />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
