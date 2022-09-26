import { Typography } from "@mui/material";
import React from "react";
import "./detail.question.styles.scss";
export default function DetailedQuestion() {
  return (
    <div className="detail-question-section mt-2">
      <div className="container">
        <div className="col-md-12 py-2">
          <Typography variant="h6" className="question-heading">Question :</Typography>
        </div>
        <div className="col-md-12 pb-2">
          <Typography className="question">
            ഭർത്താവ് മരിച്ച സ്ത്രീ ഇദ്ദ ഇരിക്കൽ നിർബന്ധമാണ്. അതിന്റെ കാരണം
            അള്ളാഹു തആല കൽപ്പിച്ചു എന്നത് തന്നെയാണ്. ഇനി അതിലെ യുക്തിയാണ്
            ചോദ്യത്തിന്റെ ഉദ്ദേശമെങ്കിൽ അവയിൽ ചിലത് പരാമർശിക്കുന്നു : 1) മരിച്ചു
            പോയ ആളുടെ സന്താനം ഭാര്യയുടെ ഉദരത്തിൽ ഉണ്ടെങ്കിൽ അതിന് കളങ്കം വരാതെ
            മറ്റൊരു വിവാഹം ഉടൻ കഴിക്കാതിരിക്കൽ. 2) തന്റെ സംരക്ഷണം ഇത്രകാലം
            നിർവഹിച്ചുപോന്ന ഭർത്താവിനോടുള്ള ആദരവും സ്നേഹവും നന്ദിയും
            അറിയിക്കുവാൻ.
          </Typography>
        </div>
      </div>
    </div>
  );
}
