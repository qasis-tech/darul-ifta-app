import { CircularProgress } from "@mui/material";

export default function Loader({ height, width }) {
  return (
    <CircularProgress
      style={{
        position: "absolute",
        width: width ? width : 40,
        height: height ? height : 40,
        top: "50%",
        left: "50%",
      }}
    />
  );
}
