import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/images/nodata.png";
import "../styles/no-data-available.styles.scss";

const NoDataAvailable = () => {
  const navigate = useNavigate();
  return (
    <div className="no-data-found">
      <div className="empty-state">
        <div className="empty-state__content">
          <div className="empty-state__icon">
            <img src={BackgroundImage} alt="background image" />
          </div>
          <div className="empty-state__message">No Data Available.</div>
        </div>
      </div>
    </div>
  );
};
export default NoDataAvailable;
