import React, { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Chip, Container, Paper } from "@mui/material";

import "./addcategory.styles.scss";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";
import { toast } from "react-toastify";

export default function AddCategories() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [isLoading, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCatgoryApi();
  }, []);

  

  const getCatgoryApi = () => {
    setLoader(true);
    axios
      .get(URLS.category, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        console.log("res category", data);
        setCategoryList(data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZXRodTkwQGdtYWlsLmNvbSIsImlhdCI6MTY2NDAwMTE4NywiZXhwIjoxNjg5OTIxMTg3fQ.5wiCZurHaz4BmYPaQ67Hf3zFMInWcOdSCyUzYo-4YWQ";

  const handleCreate = (params) => {
    const { Category } = params;
    setLoader(true);
    const subCat = selectedSubCategory?.map((item) => {
      return {
        label: item,
        active: true,
      };
    });
    let payload = { category: Category?.category, subCategory: subCat };
    axios
      .post(`${URLS.category}`, payload, {
        headers: {
          Authorization: `${token}`,
          "content-type": "application/json",
        },
      })
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

  return (
    <>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <Container maxWidth="md">
          <Paper elevation={2}>
            <div className="add-category-section">
              <form onSubmit={handleSubmit(handleCreate)}>
                <div className="add-category-container">
                  <div className="add-category-row">
                    <div className="col-md-12">
                      <Controller
                        control={control}
                        name="Category"
                        rules={{
                          required: true,
                          message: "Category is required",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            id="outlined-basic"
                            size="small"
                            options={categoryList}
                            getOptionLabel={(option) => option.category || ""}
                            onInputChange={(e, val) => {
                              if (val)
                                setCategoryList([
                                  ...categoryList,
                                  ...[{ category: val }],
                                ]);
                            }}
                            value={value}
                            onChange={(e, val) => onChange(val)}
                            renderInput={(params) => (
                              <TextField {...params} label="Category" />
                            )}
                          />
                        )}
                      />
                      {errors.Category && (
                        <div className="error">Category is required</div>
                      )}
                    </div>
                    <div className="col-md-12 subcategory">
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        options={
                          selectedCategory?.subCategory?.length
                            ? selectedCategory?.subCategory?.map(
                                (option) => option.label
                              )
                            : []
                        }
                        freeSolo
                        value={selectedSubCategory || []}
                        onChange={(e, val) => setSelectedSubCategory(val)}
                        size="small"
                        renderTags={(value, getTagProps) =>
                          value?.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              size="small"
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Subcategory"
                            placeholder="Subcategory"
                            size="small"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="btn-row">
                    <div className="col-md-1">
                      <Button
                        type="submit"
                        variant="contained"
                        className="form-btn"
                        fullWidth
                      >
                        {startCase("Create")}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Paper>
        </Container>
      )}
    </>
  );
}
