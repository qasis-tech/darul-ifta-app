import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Divider, Grid } from "@mui/material";

import FooterComponent from "../../../components/Footer";
import SingleQuestionComponent from "./SingleQuestion";
import QuestionNumberComponent from "./QuestionNumber";
import PublishedDateComponent from "./PublishedDate";
import DetailedQuestionComponent from "./DetailedQuestion";
import WrittenComponent from "./WrittenSection";
import RelatedFatwasComponent from "./RelatedFatwas";
import SocialComponent from "./Social";

import getQuestionListApi from "../../../services/getQuestionsList";
import Loader from "../../../components/common/Loader";

import "./fatwas.details.styles.scss";


export default function FatwasDetailsPage() {
  const { id } = useParams();
  const [questionDetails, setQuestionDetails] = useState(null);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    if (id) {
      setLoader(true);
      getQuestionListApi(`/${id}`)
        .then((res) => {
          setLoader(false);
          setQuestionDetails(res?.data);
          console.log("id ==> ", res?.data)
        })
        .catch((err) => {
          setQuestionDetails(null);
          setLoader(false);
          console.error(
            "getQuestionListApi Error in user/FatwasDetailsPage ",
            err
          );
        });
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="mt-5 pt-5">
          <Loader />
        </div>
      ) : (
        <>

          <div className="container">
            <QuestionNumberComponent data={questionDetails} />
            <Divider sx={{ marginY: 1 }} />
            <SingleQuestionComponent data={questionDetails} />
            <PublishedDateComponent data={questionDetails} />
            <Grid container>
              <Grid item md={0.5} xs={1.5} >
                <SocialComponent {...questionDetails} />
              </Grid>
              <Grid item md={8.5} xs={10.5}>
                <DetailedQuestionComponent data={questionDetails} />
                {questionDetails?.status === "Published" && (
                  <WrittenComponent data={questionDetails} />
                )}
              </Grid>
              <Grid item md={3} xs={12} >
                <RelatedFatwasComponent data={questionDetails} />
              </Grid>
            </Grid>
          </div>

          <FooterComponent />
        </>
      )}
    </>
  );
}
