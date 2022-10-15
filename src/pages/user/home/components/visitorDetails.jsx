import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { URLS } from "../../../../config/urls.config";
import { addGeneralDetails } from "../../../../redux/actions";

const VisitorDetails = (props) => {
  console.log("111111111111111111111111111111", props);
  const [generalDetails, setGeneralDetails] = useState(null);
  useEffect(() => {
    getGeneralList();
  }, []);

  const getGeneralList = () => {
    axios
      .get(`${URLS.generals}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setGeneralDetails(data.data);
        props.addGeneralDetails(data);
      })
      .catch((err) => {
        console.log("error generals", err);
      });
  };
  return (
    <div className="col custom-details shadow">
      <div className="custom-details-column">
        <h6>Visitor</h6>
        <div>{generalDetails?.visitors || "N/A"}</div>
      </div>

      <div className="custom-details-column">
        <h6>Total Fatwas</h6>
        <div>{generalDetails?.fatwas || "N/A"}</div>
      </div>
      <div className="custom-details-column">
        <h6>Registered Users</h6>
        <div>{generalDetails?.users || "N/A"}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  addGeneralDetails: (payload) => dispatch(addGeneralDetails(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VisitorDetails);
