import React, { useState, useEffect } from "react";

import { Autocomplete, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { URLS } from "../../../../config/urls.config";
import axios from "axios";
import Loader from "../../../../components/common/Loader";
import { useNavigate } from "react-router-dom";

const RejectedReasonSection = ({ state }) => {
  const rejectedReasons = [
    { id: 1, title: "The question should be clear without any vagueness." },
    {
      id: 2,
      title: "The question should not be against the terms and conditions",
    },
    { id: 3, title: "The question should not be an imaginary one." },
    {
      id: 4,
      title: "Mentioning madhab is mandatory for queries related to masail",
    },
  ];
  const [selectedRejectedReason, setSelectedRejectedReason] = useState([]);
  const [mufthiData, setMufthiData] = useState([]);
  const [selectedMufthi, setSelectedMufthi] = useState([]);
  const [isLoader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMufthiApi();
  }, []);

  const getMufthiApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}?userType=Mufthi`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        setMufthiData(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error mufthii--", err);
        setMufthiData([]);
      });
  };

  const handleRejectReason = ({ reason }) => {
    setLoader(true);

    let payload = {
      madhab: state?.madhab,
      category: state?.category,
      sub_category: state?.sub_category,
      short_question: state?.short_question,
      question: state?.question,
      language: state?.language,
      status: "Rejected",
      answer: state?.answer,
      reference: state?.reference,
      answered_date: state?.answered_date,
      verified_date: state?.verified_date,
      answered_by: state?.answered_by,
      verified_by: state?.verified_by,
      mufti: state?.mufti,
      verifier: state?.verifier,
      reject_by: selectedMufthi,
      mufti_answered: state?.mufti_answered,
      reject_reason: reason,
    };
    axios
      .put(`${URLS.question}/${state._id}`, payload)
      .then((res) => {
        setLoader(false);
        console.log("res put accept api", res);
        setSelectedRejectedReason("");
        setSelectedMufthi("");
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error in profile edit", err);
      });
  };
  const navigate = useNavigate();

  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <form className="mt-4" onSubmit={handleSubmit(handleRejectReason)}>
          <div className="row d-flex">
            <div className="col-md-7 first-col">
              <Autocomplete
                size="small"
                value={selectedRejectedReason || ""}
                fullWidth
                onChange={(event, newValue) => {
                  setSelectedRejectedReason(newValue);
                }}
                id="controllable-states-demo"
                options={rejectedReasons || ""}
                getOptionLabel={(option) => option?.title || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Reasons "
                    {...register("reason")}
                  />
                )}
              />
            </div>
            <div className="col-md-5">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={mufthiData || null}
                getOptionLabel={(option) => option?.name || ""}
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(e, val) => {
                  setSelectedMufthi(val);
                }}
                value={selectedMufthi || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Mufthi"
                    {...register("rejectedMufthi")}
                  />
                )}
              />
            </div>
            <div className="row my-3">
              <div className="btn-section d-flex justify-content-end">
                <Button
                  type="submit"
                  className="submit-btn form-btn"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default RejectedReasonSection;
