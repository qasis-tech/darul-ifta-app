import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addGeneralDetails } from "../../../../redux/actions";
import getGeneralsListApi from "../../../../services/getGeneralList";
import Loader from "../../../../components/common/Loader";
import { URLS } from "../../../../config/urls.config";

const VisitorDetails = (props) => {
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getGeneralsListApi()
      .then((res) => {
        console.log("response33333333",res)
        setLoader(false);
        props.addGeneralDetails(res);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error generals", err);
      });
  }, []);

  return (
    <div className="col custom-details shadow">
      {isLoading ? (
        <Loader skeleton />
      ) : (
        <>
          <div className="custom-details-column">
            <h6>Visitor</h6>
            <div>{props?.generals?.visitors || "N/A"}</div>
          </div>

          <div className="custom-details-column">
            <h6>Total Fatwas</h6>
            <div>{props?.generals?.total_fatwas || "N/A"}</div>
          </div>
          <div className="custom-details-column">
            <h6>Registered Users</h6>
            <div>{props?.generals?.musafthi || "N/A"}</div>
          </div>
        </>
      )}
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
