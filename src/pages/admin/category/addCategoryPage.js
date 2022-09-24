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
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
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
      .then((res) => {
        console.log("res category", res);
      })
      .catch((err) => {
        console.log("error category", err);
      });
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdlZXRodTkwQGdtYWlsLmNvbSIsImlhdCI6MTY2NDAwMTE4NywiZXhwIjoxNjg5OTIxMTg3fQ.5wiCZurHaz4BmYPaQ67Hf3zFMInWcOdSCyUzYo-4YWQ";
  const handleCreate = ({ category, subCategory }) => {
    let payload = { category: category, subCategory: selectedSubcategory };
    axios
      .post(`${URLS.category}`, payload, {
        headers: {
          Authorization: `${token}`,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log("res category", res);
      })
      .catch((err) => {
        console.log("Error in Category Add", err);
      });
  };
  const handlesubCategory = (e, val) => setSelectedSubcategory(val);

  return (
    <div className="add-category-section">
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="add-category-container">
          <div className="add-category-row">
            <div className="col-md-12">
              <Autocomplete
                id="tags-filled"
                options={top100Films.map((option) => option.label)}
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
                options={top100Films.map((option) => option.label)}
                freeSolo
                value={selectedSubcategory}
                onChange={(e, val) => handlesubCategory(e, val)}
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
