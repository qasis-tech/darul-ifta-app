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

const SideNavCategory = ({ selectedCategories, categoriesChip }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [madhabData, setMadhabData] = useState([]);

  useEffect(() => {
    getCatgoryListApi();
    getmadhabListApi();
  }, []);

  const getCatgoryListApi = () => {
    axios
      .get(`${URLS.category}`)
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };

  const getmadhabListApi = () => {
    axios
      .get(`${URLS.madhab}`, {
        headers: {
          // Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setMadhabData(res.data.data);
      })
      .catch((err) => {
        console.log("error madhab", err);
      });
  };

  return (
    <div class="col side-accord-container shadow">
      <div class="green">
        <span class="text-white fs-6">Categories</span>
      </div>
      <div class="l-green"></div>
      <div>
        <div class="accordian-wrapper">
          {!!categoryData?.length ? (
            categoryData?.map((category) => {
              return (
                <Accordion className="accordian">
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
      <div class="madhab-category">
        <div class="green mt-4">
          <span class="text-white fs-6">Madhab</span>
        </div>
        <div class="l-green"></div>

        <div>
          {madhabData?.length ? (
            madhabData?.map((madhab) => {
              return (
                <ul class="mt-2" key={madhab?._id}>
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
