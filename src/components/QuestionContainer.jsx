import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import URLS from "../routes/routerList";

import "../styles/question.container.styles.scss";

const QuestionContainer = (props) => {
  const navigate = useNavigate();
  return (
    <section
      className="question-section"
      onClick={() =>
        navigate(`${URLS.user.fatwasDetailsPage}/${props?.id}`, {
          state: { data: props.data },
        })
      }
    >
      <div className="question-container">
        <div className="row">
          <div className="col-md-12 heading-section">
            <Typography variant="subtitle1">{props.shortquestion}</Typography>
          </div>
          <div className="col-md-12 desc">
            <Typography variant="paragraph">{props.question}</Typography>
          </div>
          <div className="row q-footer">
            <div className="col-md-1 number-btn">
              <Typography variant="subtitle2" className="q-no">
                Q{props.questionCount.toString().padStart(3, "0")}
              </Typography>
            </div>
            <div className="col-md-3 w-name">
            <Typography variant="subtitle1">Written By : {props.writtenby || "N/A"}</Typography>
            </div>
            <div className="col-md-3">
            <Typography variant="subtitle1">Date : {props.createdDate}</Typography>
            </div>
            <div className="col-md-2">
            <Typography variant="subtitle1">Views : {props.views}</Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default QuestionContainer;
