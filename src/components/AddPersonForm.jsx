import { useTheme } from "@mui/material/styles";
import { useFormData } from "../utilities/useFormData";
import {
  Typography,
  TextField,
  Button,
  Switch,
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
      relationshipTag: [],
      birthday: {
        date: "",
        remind: true,
      },
      anniversary: {
        date: "",
        remind: false,
      },
      address: "",
      occupation: "",
      notes: "",
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const SectionLabel = ({ label }) => {
    return (
      <Typography
        component="p"
        fontWeight="bold"
        color="secondary.dark"
        padding="16px 0 0 0"
      >
        {label}
      </Typography>
    );
  };

  const tags = ["Friend", "Family", "Coworker", "Acquaintance", "Other"];

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={state.errors ? "was-validated" : null}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <SectionLabel label="Basic Info" />

      <TextField
        label="First Name"
        id="firstName"
        name="firstName"
        value={state.values.firstName}
        error={!!state.errors?.firstName}
        helperText={state.errors?.firstName}
        onChange={change}
        required
      />

      <TextField
        label="Last Name"
        id="lastName"
        name="lastName"
        value={state.values.lastName}
        onChange={change}
      />

      <SectionLabel label="Contact Info" />

      <TextField
        label="Phone Number"
        id="contactInfo.phoneNumber"
        name="contactInfo.phoneNumber"
        value={state.values.contactInfo.phoneNumber}
        onChange={change}
      />

      <TextField
        label="Email"
        id="contactInfo.email"
        name="contactInfo.email"
        value={state.values.contactInfo.email}
        onChange={change}
      />

      {/* TODO: add space for social media fields */}
      <Typography component="p" color={theme.palette.secondary.dark}>
        + add custom
      </Typography>

      <SectionLabel label="Relationship Tag" />
      {/* TODO: add relationship tags input */}
      <Typography component="p" color={theme.palette.secondary.dark}>
        tbd
      </Typography>

      <SectionLabel label="Important Dates Info" />

      <TextField
        label="Birthday"
        type="date"
        id="birthday.date"
        name="birthday.date"
        value={state.values.birthday.date}
        onChange={change}
        InputLabelProps={{ shrink: true }}
      />
      <FormControlLabel
        control={
          <Switch
            id="birthday.remind"
            name="birthday.remind"
            checked={state.values.birthday.remind}
            onChange={change}
          />
        }
        label="Remind me about the birthday"
      />

      <TextField
        label="Anniversary"
        type="date"
        id="anniversary.date"
        name="anniversary.date"
        value={state.values.anniversary.date}
        onChange={change}
        InputLabelProps={{ shrink: true }}
      />
      <FormControlLabel
        control={
          <Switch
            id="anniversary.remind"
            name="anniversary.remind"
            checked={state.values.anniversary.remind}
            onChange={change}
          />
        }
        label="Remind me about the anniversary"
      />

      <TextField
        label="Address"
        id="address"
        name="address"
        value={state.values.address}
        onChange={change}
      />

      <TextField
        label="Occupation"
        id="occupation"
        name="occupation"
        defaultValue={state.values.occupation}
        onChange={change}
      />

      <TextField
        label="Notes"
        id="notes"
        name="notes"
        defaultValue={state.values.notes}
        onChange={change}
        multiline
        rows={4}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddPersonForm;
