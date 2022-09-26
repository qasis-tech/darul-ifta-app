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
    <div className="question-details-section">
      <div className="container">
        <QuestionNumberComponent />
        <SingleQuestionComponent />
      </div>
      <PublishedDateComponent />
      <div className="container main-section">
        <div className="col">
          <SocialComponent/>
        </div>
        <div className="col-md-9 details">
          <DetailedQuestionComponent />
          <WrittenComponent />
        </div>
        <div className="col-md-3 related">
          <RelatedFatwasComponent/>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
