import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { Chip, Container, Paper } from "@mui/material";

import "./addcategory.styles.scss";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import { toast } from "react-toastify";

export default function CategoryDetails() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [isLoading, setLoader] = useState(false);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCatgoryListApi();
  }, []);

  const getCatgoryListApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.category}`)
      .then(({ data }) => {
        setLoader(false);
        setCategoryList(data);
        getCatgoryDetailsApi(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const getCatgoryDetailsApi = (list) => {
    setLoader(true);
    axios
      .get(`${URLS.category}/${id}`)
      .then(({ data }) => {
        setLoader(false);
        setCategoryDetails(data);

        let index = list?.findIndex((fl) => fl?._id === data?._id);
        if (index !== -1) {
          setSelectedCategory(list[index]);
          console.log("data details", list[index]);
          setSelectedSubCategory(
            list[index].subCategory.map((item) => item.label)
          );
        }
        console.log("index", index);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const handleCreate = () => {
    setLoader(true);

    let payload = {
      category: categoryDetails?.category,
      subCategory: categoryDetails.subCategory,
    };
    console.log("selectedCategory === ", payload);
    axios
      .put(`${URLS.category}/${id}`, payload)
      .then((res) => {
        console.log("res post category", res);
        if (res?.success) {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
            },
          });
        } else {
          toast(res.message, {
            onClose: () => {
              setLoader(false);
            },
          });
        }
      })
      .catch((err) => {
        console.log("Error in Category Add", err);
        setLoader(false);
        toast("Somthing went wrong, please try again later", {
          onClose: () => {
            setLoader(false);
          },
        });
      });
  };

  const handleCategory = (val) => {
    let temp = { ...categoryDetails };
    temp.category = val;
    setCategoryDetails(temp);
  };

  const handleSubCategory = (val, index) => {
    let temp = { ...categoryDetails };
    temp.subCategory[index].label = val;
    setCategoryDetails(temp);
  };

  return (
    <>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <Container maxWidth="md">
        <Paper elevation={2} className="add-category-section">
          <form onSubmit={handleSubmit(handleCreate)}>
            <div className="add-category-container">
              <div className="add-category-row align-items-start">
                <div className="col-md-12">
                  <TextField
                    type="text"
                    label="Category"
                    fullWidth
                    size="small"
                    value={categoryDetails?.category}
                    onChange={(e) => handleCategory(e.target.value)}
                  />

                  {!selectedCategory?.category && (
                    <div className="error">{errors?.category?.message}</div>
                  )}
                </div>
                  {categoryDetails?.subCategory?.length &&
                    categoryDetails?.subCategory.map((item, index) => {
                      return (
                        <div className="col-md-12 subcategory mt-4">
                        <TextField
                        className="me-3"
                          type="text"
                          fullWidth
                          label="Subcategory"
                          size="small"
                          value={item?.label}
                          onChange={(e) =>
                            handleSubCategory(e.target.value, index)
                          }
                        />
                </div>
                      );
                    })}
              </div>
              <div className="btn-row">
                <div className="col-md-1">
                  <Button
                    type="submit"
                    variant="contained"
                    className="form-btn"
                    fullWidth
                  >
                    {startCase("Update")}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Paper>
        </Container>
      )}
    </>
  );
}
