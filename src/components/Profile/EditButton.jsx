/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

const EditButton = ({ onClick }) => (
  <IconButton size="small" onClick={onClick} sx={{ ml: 1 }}>
    <Edit fontSize="small" />
  </IconButton>
);

export default EditButton;
