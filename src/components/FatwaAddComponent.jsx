import * as React from "react";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "../styles/fatwa.add.styles.scss";
import { useForm, useFieldArray } from "react-hook-form";
export default function FatwaAddComponent() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    resetField,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      showShortQuestion: [
        {
          quote: "",
          bookName: "",
          vol: "",
          pgNo: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "showShortQuestion",
  });

  const watchFieldArray = watch("showShortQuestion");
  const controlledFields = fields?.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
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
              <AddIcon
                onClick={() =>
                  append({
                    quote: "",
                    bookName: "",
                    vol: "",
                    pgNo: "",
                  })
                }
              />
            </Button>
          </div>
        </div>
      </div>
      {controlledFields?.map((list, index) => {
        return (
          <div key={list.id} className="show-table-container">
            <div className="col-md-10">
              <div className="show-table-row">
                <div className="col-md-12">
                  <TextField id="quote" label="Quote" size="small" fullWidth />
                </div>
                <div className="second-row">
                  <div className="col-md-4 first-col">
                    <TextField
                      id="bookName"
                      label="Book Name"
                      size="small"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="volume"
                      label="Volume"
                      size="small"
                      fullWidth
                    />
                  </div>
                  <div className="col-md-4 second-col">
                    <TextField
                      id="pgNo"
                      label="Page Number"
                      size="small"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 close-section">
              {fields.length > 1 && (
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
