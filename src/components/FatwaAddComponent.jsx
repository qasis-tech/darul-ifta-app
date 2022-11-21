import React, { useState } from "react";

import { Button, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import "../styles/fatwa.add.styles.scss";
import { useEffect } from "react";

export default function FatwaAddComponent({ referenceList, setReferance }) {
  useEffect(() => {
    if (referenceList?.length) {
      setList(referenceList);
    }
  }, []);
  const [list, setList] = useState([
    {
      quote: "",
      bookName: "",
      vol: "",
      pgNo: "",
    },
  ]);

  const append = () => {
    let temp = [...list];
    temp.push({
      quote: "",
      bookName: "",
      vol: "",
      pgNo: "",
    });
    setList(temp);
  };

  const remove = (index) => {
    let temp = [...list];
    temp.splice(index, 1);
    setList(temp);
    setReferance(temp);
  };

  const handleData = (val, field, index) => {
    console.log("val, field", val, field);
    let temp = [...list];
    temp[index][`${field}`] = val;
    setList(temp);
    setReferance(temp);
  };

  console.log("list", list);

  return (
    <div className="show-section">
      <div className="show-container">
        <div className="show-row">
          <div className="col-md-4">
            <div className="heading">
              <h5>Show</h5>
            </div>
          </div>
          <div className="col-md-4 add-button">
            <Button variant="contained" className="add-btn">
              {" "}
              <AddIcon onClick={() => append()} />
            </Button>
          </div>
        </div>
      </div>
      {list?.map((item, index) => {
        return (
          <div key={index} className="show-table-container">
            <div className="col-md-10">
              <div className="show-table-row">
                <div className="col-md-12">
                  <TextField
                    id="quote"
                    label="Quote"
                    size="small"
                    fullWidth
                    value={item.quote}
                    onChange={(e) => handleData(e.target.value, "quote", index)}
                  />
                </div>
                <div className="second-row">
                  <div className="col-md-4 first-col">
                    <TextField
                      id="bookName"
                      label="Book Name"
                      size="small"
                      fullWidth
                      value={item.bookName}
                      onChange={(e) =>
                        handleData(e.target.value, "bookName", index)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="volume"
                      label="Volume"
                      size="small"
                      fullWidth
                      value={item.vol}
                      onChange={(e) => handleData(e.target.value, "vol", index)}
                    />
                  </div>
                  <div className="col-md-4 second-col">
                    <TextField
                      id="pgNo"
                      label="Page Number"
                      size="small"
                      fullWidth
                      value={item.pgNo}
                      onChange={(e) =>
                        handleData(e.target.value, "pgNo", index)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 close-section">
              {list?.length > 1 && (
                <div className="close-button">
                  <HighlightOffIcon onClick={() => remove(index)} />
                </div>
              )}
            </div>
          </div>
        );
      })}
      <hr />
    </div>
  );
}
