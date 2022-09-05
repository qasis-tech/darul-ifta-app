import React from "react";
import "../styles/question.container.styles.scss";
const QuestionContainer = () => {
  return (
    <section className="question-section">
      <div className="question-container">
        <div className="row">
            <div className="col-md-12 heading-section">
                <h5>heading</h5>
            </div>
            <div className="col-md-12 desc">
                <h5>afdftusaudgzh</h5>
            </div>
            <div className="row q-footer">
                <div className="col-md-3 number-btn">
                    <span className="q-no">Q0564</span>
                </div>
                <div className="col-md-3 w-name">
                    <h5>dujgsfsf</h5>
                </div>
                <div className="col-md-3">
                    <h5>Date:</h5>
                </div>
                <div className="col-md-3">
                    <h5>Views:22</h5>
                </div>
            </div>
        </div>
        
      </div>
    </section>
  );
};
export default QuestionContainer;
