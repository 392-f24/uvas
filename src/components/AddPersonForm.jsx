import { useTheme } from "@mui/material/styles";
import { useFormData } from "../utilities/useFormData";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const validateForm = (key, val) => {
  switch (key) {
    case "firstName":
      return val.length < 1 ? "Name must be at least 1 character" : "";
      return "";
  }
};

const AddPersonForm = ({ user }) => {
  const theme = useTheme();

  const [state, change] = useFormData(
    validateForm,
    user || {
      firstName: "",
      lastName: "",
      contactInfo: {
        phoneNumber: "",
        email: "",
        others: {},
      },
      address: "",
      relationshipTag: [],
      birthday: {
        date: "",
        remind: true,
      },
      occupation: "",
      notes: "",
      anniversary: {
        date: "",
        remind: false,
      },
    }
  );

  return (
    <Typography component="p" color={theme.palette.secondary.dark}>
      AddPersonForm
    </Typography>
  );
};

export default AddPersonForm;
