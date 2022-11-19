import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { Alert, AlertTitle, Divider, Grow } from "@mui/material";
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
    if (visible) {
      setOpen(visible);
    }
  }, [visible]);

  useEffect(() => {
    // setTimeout(() => {
    //   setOpen(false);
    //   onClose();
    // }, 3500);
  }, []);

  const TransitionUp = (props) => (
    <Grow {...props} timeout={1000} unmountOnExit />
  );

  return (
    <div>
      {open && (
        <Snackbar
          className="snack-main shadow"
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={() => {
            setOpen(false);
            onClose();
          }}
          key={"top" + "right"}
          TransitionComponent={TransitionUp}
        >
          <Alert severity={type ? type : "error"} className={`alert-${type}`}>
            <Divider />
            <strong>
              {message || "Something went wrong...! Please try again.!"}
            </strong>
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
// error,warning, info, success
