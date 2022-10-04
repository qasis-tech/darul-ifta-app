// import * as React from "react";
// import Button from "@mui/material/Button";
// import Snackbar from "@mui/material/Snackbar";
// import Slide from "@mui/material/Slide";
// import "../styles/common.styles.scss";
// // function TransitionLeft(props) {
// //   return <Slide {...props} direction="left" />;
// // }

// // function TransitionUp(props) {
// //   return <Slide {...props} direction="up" />;
// // }

// // function TransitionRight(props) {
// //   return <Slide {...props} direction="right" />;
// // }

// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }

// export default function DirectionSnackbar() {
//   const [open, setOpen] = React.useState(false);
//   const [transition, setTransition] = React.useState(undefined);

//   const handleClick = (Transition) => () => {
//     setTransition(() => Transition);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       {/* <Button onClick={handleClick(TransitionLeft)}>Right</Button>
//       <Button onClick={handleClick(TransitionUp)}>Up</Button>
//       <Button onClick={handleClick(TransitionRight)}>Left</Button> */}
//       <Button
//         variant="contained"
//         onClick={handleClick(TransitionUp)}
//         sx={{
//           position: "absolute",
//           bottom: (theme) => theme.spacing(2),
//           right: (theme) => theme.spacing(2),
//         }}
//         className="add-btn"
//       >
//         Down
//       </Button>

//       <Snackbar
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={transition}
//         message="I love snacks"
//         key={transition ? transition.name : ""}
//       />
//     </div>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from '@mui/material/Slide';

export default function DirectionSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
  const buttons = (
    <React.Fragment>
      <Button
      variant="contained"
      className="add-btn"
        onClick={handleClick({
          vertical: "top",
          horizontal: "right",
        })}
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        Top-Right
      </Button>
    </React.Fragment>
  );

  return (
    <div>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
        TransitionComponent={TransitionUp}
      />
    </div>
  );
}
