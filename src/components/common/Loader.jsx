import { CircularProgress, Skeleton, Box } from "@mui/material";

export default function Loader({
  height,
  width,
  absolute,
  skeleton,
  color,
  layers,
}) {
  if (skeleton) {
    if (layers === 1) {
      return  (
        <Box>
            <Skeleton height={150} />
            <Skeleton animation="wave" height={60} />
            <Skeleton height={40} />            
          </Box>
      )
      
    } else if (layers > 1) {
      return (
        <>
          <Box>
            <Skeleton height={150} />
            <Skeleton animation="wave" height={60} />
            <Skeleton height={40} />
          </Box>
          <Box>
            <Skeleton height={150} />
            <Skeleton animation="wave" height={60} />
            <Skeleton height={40} />
          </Box>
        </>
      );
    }
    return (
      <Box>
        <Skeleton height={100} />
        <Skeleton animation="wave" height={40} />
        <Skeleton height={40} />
      </Box>
    );
  } else {
    return (
      <CircularProgress
        style={{
          position: absolute ? "absolute" : "relative",
          width: width ? width : 40,
          height: height ? height : 40,
          top: "50%",
          left: "50%",
          color: color,
        }}
      />
    );
  }
}
