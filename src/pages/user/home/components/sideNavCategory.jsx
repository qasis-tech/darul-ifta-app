import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { URLS } from "../../../../config/urls.config";
import NoDataAvailable from "../../../../components/NoDataAvailable";
import Loader from "../../../../components/common/Loader";
import { connect } from "react-redux";
import { addHomeFilter } from "../../../../redux/actions";

const SideNavCategory = ({ addHomeFilter, homeFilter, ...other }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [madhabData, setMadhabData] = useState([]);
  const [isloading, setLoader] = useState(false);

  useEffect(() => {
    getCatgoryListApi();
    getmadhabListApi();
  }, []);

  const getCatgoryListApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.category}`)
      .then((res) => {
        setLoader(false);
        setCategoryData(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const getmadhabListApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.madhab}`)
      .then((res) => {
        setLoader(false);
        setMadhabData(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error madhab", err);
      });
  };

  return (
    <div className="col side-accord-container shadow">
      <div className="green">
        <Typography variant="subtitle1" className="text-white">
          Categories
        </Typography>
      </div>
      <div className="l-green"></div>

      <div className="accordian-wrapper">
        {isloading ? (
          <Loader skeleton />
        ) : !!categoryData?.length ? (
          categoryData?.map((category) => (
            <Accordion className="accordian" key={category?._id}>
              <AccordionSummary
                className="shadow-sm main-category-accordian"
                expandIcon={<ExpandMoreIcon className="arrow-color" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                key={category._id}
              >
                <Typography variant="subtitle2">
                  {category?.category}
                </Typography>
              </AccordionSummary>

              {category?.subCategory?.length ? (
                category?.subCategory?.map((subcategory) => {
                  return (
                    <AccordionDetails
                      key={subcategory._id}
                      className="border-bottom"
                    >
                      <Typography
                        variant="subtitle2"
                        className="accordion-sub"
                        onClick={() => {
                          let temp = { ...homeFilter };
                          console.log("categoriesChip ==> ", temp);
                          temp.category = subcategory;
                          addHomeFilter(temp);
                        }}
                      >
                        {subcategory.label}
                      </Typography>
                    </AccordionDetails>
                  );
                })
              ) : (
                <div>no data</div>
              )}
            </Accordion>
          ))
        ) : (
          <div>
            <NoDataAvailable noStyle text noBg />
          </div>
        )}
      </div>

      <Paper elevation={2}>
        <div className="madhab-category">
          <div className="green mt-4">
            <Typography variant="subtitle1" className="text-white">
              Madhab
            </Typography>
          </div>
          <div className="l-green"></div>

          <div>
            {isloading ? (
              <Loader skeleton />
            ) : madhabData?.length ? (
              <ul className="mt-2 ms-2">
                {madhabData?.map((madhab) => {
                  return (
                    <li
                      key={madhab?._id}
                      onClick={() => {
                        let temp = { ...homeFilter };
                        temp.madhab = madhab;
                        addHomeFilter(temp);
                      }}
                    >
                      <Typography variant="subtitle2">
                        {madhab?.title}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <NoDataAvailable noStyle text noBg />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  addHomeFilter: (payload) => dispatch(addHomeFilter(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavCategory);
