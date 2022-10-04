import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Alert, AlertTitle } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import "../../styles/common.styles.scss";

export default function DirectionSnackbar({
  visible,
  type,
  message,
  title,
  onClose,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (visible) setOpen(visible);

    // setTimeout(() => {
    //   setOpen(false);
    //   onClose();
    // }, 3000);

    return () => {
      setOpen(false);
    };
  }, [visible]);

  const TransitionUp = (props) => <Slide {...props} direction="up" />;

  return (
    <div>
      <Snackbar
      className="snack-main"
        // autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={() => setOpen(false)}
        key={"top" + "right"}
        TransitionComponent={TransitionUp}
      >
        <Alert severity={type ? type : "success"} className="alert-success">
          <AlertTitle>{title ? title : "Error"}</AlertTitle>
          <strong>
            {message || "Something went wrong...! Please try again.!"}
          </strong>
        </Alert>
      </Snackbar>
    </div>
  );
}
// error,warning, info, success
