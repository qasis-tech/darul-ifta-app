import React from "react";
import { Box, Typography } from "@mui/material";

import "./single.question.styles.scss";

export default function SingleQuestion({ data }) {
  return (
    <Box component="div" sx={{ marginY: 2, marginTop: 7 }}>
      <Typography variant="h5">{data?.short_question || "N/A"}</Typography>
    </Box>
  );
}
