import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./addcategory.styles.scss";
import { Chip } from "@mui/material";
import { URLS } from "../../../config/urls.config";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function AddCategories() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCatgoryApi();
  }, []);

  const getCatgoryApi = () => {
    axios
      .get(URLS.category, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        console.log("res category", data.data);
        setCategoryList(data.data);
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZXRodTkwQGdtYWlsLmNvbSIsImlhdCI6MTY2NDAwMTE4NywiZXhwIjoxNjg5OTIxMTg3fQ.5wiCZurHaz4BmYPaQ67Hf3zFMInWcOdSCyUzYo-4YWQ";

  const handleCreate = () => {
    console.log("Ressss", selectedCategory, selectedSubCategory);
    const subCat = selectedSubCategory.map((item) => {
      return {
        label: item,
        active: true,
      };
    });

    let payload = { category: selectedCategory.category, subCategory: subCat };
    console.log("Result 1", payload);
    axios
      .post(`${URLS.category}`, payload, {
        headers: {
          Authorization: `${token}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log("res post category", res);
      })
      .catch((err) => {
        console.log("Error in Category Add", err);
      });
  };
  const handlesubCategory = (e, val) => setCategoryList(val);

  return (
    <div className="add-category-section">
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="add-category-container">
          <div className="add-category-row">
            <div className="col-md-12">
              {categoryList?.length && (
                <Autocomplete
                  id="tags-filled"
                  options={categoryList}
                  getOptionLabel={(option, eee) => option.category}
                  value={selectedCategory}
                  onChange={(e, val) => setSelectedCategory(val)}
                  freeSolo
                  size="small"
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
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
                      label="Category"
                      placeholder="Category"
                      size="small"
                      {...register("category")}
                    />
                  )}
                />
              )}
            </div>
            <div className="col-md-12 subcategory">
              {/* <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Subcategory" />
              )}
            /> */}
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
                  value.map((option, index) => (
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
                CREATE
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
