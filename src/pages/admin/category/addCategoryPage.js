import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./addcategory.styles.scss";
import { Chip } from "@mui/material";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function AddCategories() {
  return (
    <div className="add-category-section">
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
                />
              )}
            />
          </div>
        </div>
        <div className="btn-row">
          <div className="col-md-1">
            <Button variant="contained" className="form-btn" fullWidth>
              CREATE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
