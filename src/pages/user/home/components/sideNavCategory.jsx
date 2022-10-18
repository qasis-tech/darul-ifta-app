import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { URLS } from "../../../../config/urls.config";
import NoDataAvailable from "../../../../components/NoDataAvailable";
import Loader from "../../../../components/common/Loader";

const SideNavCategory = ({ selectedCategories, categoriesChip }) => {
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
        <span className="text-white fs-6">Categories</span>
      </div>
      <div className="l-green"></div>
      <div>
        <div className="accordian-wrapper">
          {isloading ? (
            <Loader skeleton />
          ) : !!categoryData?.length ? (
            categoryData?.map((category) => {
              return (
                <Accordion className="accordian" key={category?._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon className="arrow-color" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    key={category._id}
                  >
                    <Typography>{category?.category}</Typography>
                  </AccordionSummary>

                  {category?.subCategory?.length ? (
                    category?.subCategory?.map((subcategory) => {
                      return (
                        <AccordionDetails
                          key={subcategory._id}
                          className="border-bottom"
                        >
                          <span
                            className="accordion-sub"
                            onClick={() => {
                              categoriesChip.category = category;
                              categoriesChip.subcategory = subcategory;
                              selectedCategories(categoriesChip);
                            }}
                          >
                            {subcategory.label}
                          </span>
                        </AccordionDetails>
                      );
                    })
                  ) : (
                    <div>no data</div>
                  )}
                </Accordion>
              );
            })
          ) : (
            <NoDataAvailable noStyle text noBg />
          )}
        </div>
      </div>
      <div className="madhab-category">
        <div className="green mt-4">
          <span className="text-white fs-6">Madhab</span>
        </div>
        <div className="l-green"></div>

        <div>
          {isloading ? (
            <Loader skeleton />
          ) : madhabData?.length ? (
            madhabData?.map((madhab) => {
              return (
                <ul className="mt-2" key={madhab?._id}>
                  <li
                    onClick={() => {
                      categoriesChip.madhab = madhab;
                      selectedCategories(categoriesChip);
                    }}
                  >
                    {madhab?.title}
                  </li>
                </ul>
              );
            })
          ) : (
            <NoDataAvailable noStyle text noBg />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavCategory;
