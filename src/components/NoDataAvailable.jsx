import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/images/nodata.png";
import BackgroundImage1 from "../assets/images/nodataavailable.png";
import "../styles/no-data-available.styles.scss";

const NoDataAvailable = ({ absolute, noStyle, text, noBg }) => {
  const navigate = useNavigate();
  return (
    <div
      className="no-data-found"
      style={
        noStyle
          ? {}
          : {
              position: absolute ? "absolute" : "relative",
              top: "50%",
              left: "50%",
            }
      }
    >
      <div
        className="empty-state"
        style={{ backgroundColor: noBg ? "transparent" : "" }}
      >
        <div className="empty-state__content">
          {!text ? (
            <div className="empty-state__icon">
              <img src={BackgroundImage1} alt="background image" />
            </div>
          )
           : 
          <div className="empty-state__message">No Data Available</div>
        
        }
        </div>
      </div>
    </div>
  );
};
export default NoDataAvailable;
