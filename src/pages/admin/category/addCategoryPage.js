import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Chip } from "@mui/material";

import "./addcategory.styles.scss";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";

export default function AddCategories() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
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
        console.log("res category", data.data);
        setCategoryList(data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZXRodTkwQGdtYWlsLmNvbSIsImlhdCI6MTY2NDAwMTE4NywiZXhwIjoxNjg5OTIxMTg3fQ.5wiCZurHaz4BmYPaQ67Hf3zFMInWcOdSCyUzYo-4YWQ";

  const handleCreate = () => {
    setLoader(true);
    const subCat = selectedSubCategory?.map((item) => {
      return {
        label: item,
        active: true,
      };
    });

    let payload = { category: selectedCategory?.category, subCategory: subCat };
    console.log("selectedCategory === ", payload);
    axios
      .post(`${URLS.category}`, payload, {
        headers: {
          Authorization: `${token}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log("res post category", res);
        setLoader(false);
        navigate(-1);
      })
      .catch((err) => {
        console.log("Error in Category Add", err);
        setLoader(false);
      });
  };

  const navigate = useNavigate();

  return (
    <div className="add-category-section">
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="add-category-container">
          <div className="add-category-row">
            <div className="col-md-12">
              <Autocomplete
                id="tags-filled-1"
                options={categoryList || ""}
                getOptionLabel={(option) => option?.category || ""}
                value={selectedCategory}
                onChange={(e, val) => setSelectedCategory(val)}
                onInputChange={(e, val) => {
                  if (val)
                    setCategoryList([...categoryList, ...[{ category: val }]]);
                }}
                freeSolo
                size="small"
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    return (
                      <Chip
                        variant="outlined"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Category"
                    placeholder="Category"
                    size="small"
                    {...register("category")}
                  />
                )}
              />
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
                    {...register("subCategory")}
                  />
                )}
              />
            </div>
          </div>
          <div className="btn-row">
            <div className="col-md-1">
              {isLoading ? (
                <Loader height={25} width={25} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  className="form-btn"
                  fullWidth
                >
                  {startCase("Create")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
