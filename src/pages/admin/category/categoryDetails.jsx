import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { startCase } from "lodash";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { Chip } from "@mui/material";

import "./addcategory.styles.scss";

import { URLS } from "../../../config/urls.config";
import Loader from "../../../components/common/Loader";
import SnackBar from "../../../components/common/Snackbar";

export default function CategoryDetails() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [errorPopup, setError] = useState({
    visible: false,
    message: "",
    type: "error",
    title: "",
  });
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCatgoryApi();
  }, []);

  const handleCloseError = () => {
    setError({
      visible: false,
      message: "",
      type: "",
      titile: "",
    });
    navigate(-1);
  };

  const getCatgoryApi = () => {
    setLoader(true);
    axios
      .get(`${URLS.category}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setLoader(false);
        console.log("000000000", data);
        setCategoryList(data);

        // let index = categoryList.findIndex(
        //   (value) => value.category === data?.category
        // );
        // setSelectedCategory(categoryList[index]);

      })
      .catch((err) => {
        setLoader(false);
        console.log("error category", err);
      });
  };


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
      .put(`${URLS.category}/${id}`, payload, {
      })
      .then((res) => {
        console.log("res post category", res);
        setLoader(false);
        if (res?.success) {
          setError({
            visible: true,
            message: res.message,
            type: "success",
            title: "Success",
          });
        } else {
          setError({
            visible: true,
            message: res.message,
            type: "warning",
            title: "Warning",
          });
        }
        // navigate(-1);
      })
      .catch((err) => {
        console.log("Error in Category Add", err);
        setLoader(false);
        setError({
          visible: true,
          message: "Tetingggg",
          type: "error",
        });
      });
  };

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <Loader absolute />
      ) : (
        <div className="add-category-section shadow">
          <form onSubmit={handleSubmit(handleCreate)}>
            <div className="add-category-container">
              <div className="add-category-row">
                <div className="col-md-12">
                  <Autocomplete
                    id="tags-filled-1"
                    options={categoryList}
                    getOptionLabel={(option) => option?.category || ""}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value._id
                    }
                    onChange={(e, val) => {setSelectedCategory(val);console.log("999999999",val)}}
                    value={selectedCategory}
                    // onInputChange={(e, val) => {
                    //   if (val)
                    //     setCategoryList([
                    //       ...categoryList,
                    //       ...[{ category: val }],
                    //     ]);
                    // }}
                    freeSolo
                    size="small"
                    // renderTags={(value, getTagProps) =>
                    //   value.map((option, index) => {
                    //     return (
                    //       <Chip
                    //         variant="outlined"
                    //         label={option}
                    //         size="small"
                    //         {...getTagProps({ index })}
                    //       />
                    //     );
                    //   })
                    // }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Category"
                        placeholder="Category"
                        size="small"
                        // {...register("category", {
                        //   required: "Category is required",
                        // })}
                      />
                    )}
                  />
                  {!selectedCategory.category && (
                    <div className="error">{errors?.category?.message}</div>
                  )}
                </div>
                <div className="col-md-12 subcategory">
                  <Autocomplete
                    multiple
                    id="subcategory"
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

          {errorPopup.visible && (
            <SnackBar
              visible={errorPopup.visible}
              message={errorPopup.message}
              type={errorPopup.type}
              title={errorPopup.title}
              onClose={() => handleCloseError()}
            />
          )}
        </div>
      )}
    </>
  );
}
