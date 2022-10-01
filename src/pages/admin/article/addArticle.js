import React from "react";
import { TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import "./add.article.styles.scss";
const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

export default function AddArticle() {
  return (
    <div className="add-article-section">
      <form>
        <div className="add-article-container">
          <div className="add-article-row">
            <div className="col-md-6 first-col">
              <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={top100Films}
                renderInput={(params) => (
                  <TextField {...params} label="Mufthi Name" />
                )}
              />
            </div>
            <div className="col-md-6 second-col">
              <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={top100Films}
                renderInput={(params) => (
                  <TextField {...params} label="Language" />
                )}
              />
            </div>
          </div>
          <div className="add-article-row">
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              fullWidth
              rows={2}
            />
          </div>
          <div className="add-article-row">
            <Button
              variant="contained"
              className="file-btn"
              fullWidth
              component="label"
            >
              Upload File
              <input type="file" hidden />
            </Button>
          </div>
          <div className="btn-section">
            <div className="col-md-1">
              <Button
                variant="contained"
                className="form-btn"
                type="submit"
                fullWidth
              >
                SAVE
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
