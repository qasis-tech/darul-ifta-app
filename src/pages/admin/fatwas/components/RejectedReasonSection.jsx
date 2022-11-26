import React, { useState, useEffect } from "react";

import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { URLS } from "../../../../config/urls.config";
import axios from "axios";
import Loader from "../../../../components/common/Loader";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RejectedReasonSection = ({ state, close }) => {
  const navigate = useNavigate();

  const [selectedRejectedReason, setSelectedRejectedReason] = useState([]);
  const [mufthiData, setMufthiData] = useState([]);
  const [isLoader, setLoader] = useState(false);

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  console.log("errors", errors);
  useEffect(() => {
    getMufthiApi();
  }, []);

  const getMufthiApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.user}${URLS.signup}?userType=Mufthi`)
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

  const handleRejectReason = ({ reason, rejectedMufthi }) => {
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
      reject_by: rejectedMufthi,
      mufti_answered: state?.mufti_answered,
      reject_reason: reason?.title,
    };

    axios
      .put(`${URLS.question}/${state._id}`, payload)
      .then((res) => {
        if (res?.success) {
          toast(res.message);
          setLoader(false);
          close();
          navigate(-1);
        } else {
          toast(res.message);
          setLoader(false);
        }
      })
      .catch((err) => {
        toast(err.message);
        setLoader(false);
        console.error("Error in profile edit", err);
      });
  };

  return (
    <>
      {isLoader ? (
        <div style={{ minHeight: 250 }}>
          <Loader skeleton />
        </div>
      ) : (
        <form className="mt-4 " onSubmit={handleSubmit(handleRejectReason)}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name="reason"
                rules={{ required: true, message: "Reason is required" }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    id="reasonForReject"
                    size="small"
                    fullWidth
                    options={rejectedReasons || ""}
                    getOptionLabel={(option) => option?.title || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={value}
                    onChange={(event, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="Reasons " />
                    )}
                  />
                )}
              />
              {errors.reason && <div className="error">Reason is required</div>}
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name="rejectedMufthi"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    disablePortal
                    id="rejectByMufthi"
                    size="small"
                    options={mufthiData || null}
                    getOptionLabel={(option) => option?.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    value={value}
                    onChange={(e, val) => onChange(val)}
                    renderInput={(params) => (
                      <TextField {...params} label="Mufthi" />
                    )}
                  />
                )}
              />
              {errors.rejectedMufthi && (
                <div className="error">Mufthi is required</div>
              )}
            </Grid>
          </Grid>
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
        </form>
      )}
    </>
  );
};

export default RejectedReasonSection;
