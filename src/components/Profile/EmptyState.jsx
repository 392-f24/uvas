/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
// import { Add } from "@mui/icons-material";

const EmptyState = ({ text }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      color: "text.disabled",
      gap: 1,
      fontSize: "0.875rem",
    }}
  >
    {/* <Add fontSize="small" /> */}
    <Typography variant="body2" color="text.disabled">
      {text}
    </Typography>
  </Box>
);

export default EmptyState;
