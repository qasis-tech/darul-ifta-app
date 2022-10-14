import React from "react";
import { useNavigate } from "react-router-dom";
import URLS from "../routes/routerList";
import Button from '@mui/material/Button';

import "../styles/question.container.styles.scss";

const QuestionContainer = (props) => {
  const navigate = useNavigate();
  return (
    <section
      className="question-section"
      onClick={() =>
        navigate(`${URLS.user.fatwasDetailsPage}`, {
          state: { data: props.data },
        })
      }
    >
      <div className="question-container">
        <div className="row">
          <div className="col-md-12 heading-section">
            <h5>{props.shortquestion}</h5>
          </div>
          <div className="col-md-12 desc">
            <h5>{props.question}</h5>
          </div>
          <div className="row q-footer">
            <div className="col-md-1 number-btn">
              <span className="q-no">Q{props.questionCount}</span>
            </div>
            <div className="col-md-3 w-name">
              <h5>Written By:{props.writtenby || "N/A"}</h5>
            </div>
            <div className="col-md-3">
              <h5>Date:{props.createdDate}</h5>
            </div>
            <div className="col-md-2">
              <h5>Views:{props.views}</h5>
            </div>
            <div className="col-md-2">
            <Button variant="text">Edit</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default QuestionContainer;
