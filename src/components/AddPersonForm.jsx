import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useFormData } from "../utilities/useFormData";
import { addPerson, fetchTags, updateTags } from "../utilities/dbFunctions";
import { v4 as uuidv4 } from "uuid";
import {
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const demoData = {
  avatar: "",
  firstName: "Samantha",
  lastName: "Woods",
  relationshipTags: ["Friend"],
  birthday: "2002-03-04",
  anniversary: "",
  likes: ["Video games", "Rock climbing", "Soccer", "Traveling"],
  dislikes: ["Spicy food", "Cold weather"],
  contactInfo: {
    address: "633 Clark St, Chicago, IL 60610",
    phoneNumber: "8293748203",
    email: "sam.woods@gmail.com",
    others: {
      Instagram: "@samwoods",
      "Emergency Contact": "John Woods",
    },
  },
  occupation: "Student",
  notes: "CS Major and DSGN minor",
};

const defaultData = {
  avatar: "",
  firstName: "",
  lastName: "",
  relationshipTags: [],
  birthday: "",
  anniversary: "",
  likes: [],
  dislikes: [],
  contactInfo: {
    address: "",
    phoneNumber: "",
    email: "",
    others: {},
  },
  occupation: "",
  notes: "",
};

const validateForm = (key, val) => {
  switch (key) {
    case "firstName":
      return val.length < 1 ? "Name must be at least 1 character" : "";
    case "relationshipTags":
      return val.length === 0
        ? "Please select at least one relationship tag"
        : "";
    default:
      return "";
  }
};

const AddPersonForm = ({ userId, onClose }) => {
  const theme = useTheme();

  const [state, change] = useFormData(validateForm, defaultData);

  const onSubmit = async (e) => {
    e.preventDefault();

    const filteredOthers = Object.fromEntries(
      Object.entries(state.values.contactInfo.others).filter(
        ([key, value]) => value.trim() !== ""
      )
    );

    const initials = state.values.firstName[0] + state.values.lastName[0];

    const personId = uuidv4();

    const person = {
      ...state.values,
      avatar: initials,
      id: personId,
      likes,
      dislikes,
      contactInfo: {
        ...state.values.contactInfo,
        others: filteredOthers,
      },
    };

    try {
      await addPerson(userId, person);
      await updateTags(userId, person.relationshipTags);
      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
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

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [displayCustomTagForm, setDisplayCustomTagForm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [displayCustomContactForm, setDisplayCustomContactForm] =
    useState(false);
  const [customContactLabel, setCustomContactLabel] = useState("");
  const [customContactValue, setCustomContactValue] = useState("");
  const [likes, setLikes] = useState(state.values.likes || []);
  const [dislikes, setDislikes] = useState(state.values.dislikes || []);
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");

  useEffect(() => {
    const fetchUserTags = async () => {
      const userTags = await fetchTags(userId);
      setTags(userTags);
    };

    fetchUserTags();
  }, [userId]);

  const toggleTag = (tag) => {
    const newTags = state.values.relationshipTags.includes(tag)
      ? state.values.relationshipTags.filter((t) => t !== tag)
      : [...state.values.relationshipTags, tag];

    change({
      target: {
        id: "relationshipTags",
        value: newTags,
      },
    });
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      toggleTag(newTag);
    }

    setNewTag("");
    setDisplayCustomTagForm(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      change({
        target: {
          id: "avatar",
          value: file,
        },
      });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAddCustomContact = () => {
    if (customContactLabel.trim() !== "" && customContactValue.trim() !== "") {
      const updatedOthers = {
        ...state.values.contactInfo.others,
        [customContactLabel]: customContactValue,
      };
      change({
        target: {
          id: `contactInfo`,
          value: {
            ...state.values.contactInfo,
            others: updatedOthers,
          },
        },
      });

      setCustomContactLabel("");
      setCustomContactValue("");
      setDisplayCustomContactForm(false);
    }
  };

  const handleCustomContactChange = (label, newValue) => {
    const updatedOthers = {
      ...state.values.contactInfo.others,
      [label]: newValue,
    };

    change({
      target: {
        id: `contactInfo`,
        value: {
          ...state.values.contactInfo,
          others: updatedOthers,
        },
      },
    });
  };

  const handleAddLike = () => {
    if (newLike.trim()) {
      setLikes([...likes, newLike.trim()]);
      setNewLike("");
    }
  };

  const handleAddDislike = () => {
    if (newDislike.trim()) {
      setDislikes([...dislikes, newDislike.trim()]);
      setNewDislike("");
    }
  };

  const handleRemoveLike = (index) => {
    setLikes(likes.filter((_, i) => i !== index));
  };

  const handleRemoveDislike = (index) => {
    setDislikes(dislikes.filter((_, i) => i !== index));
  };

  const handleNestedChange = (e) => {
    const { id, value } = e.target;
    const keys = id.split(".");
    const lastKey = keys.pop();
    let obj = state.values;

    keys.forEach((key) => {
      if (!obj[key]) obj[key] = {};
      obj = obj[key];
    });
    obj[lastKey] = value;

    change({
      target: {
        id: keys[0],
        value: { ...state.values[keys[0]], [lastKey]: value },
      },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={state.errors ? "was-validated" : null}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      {/* PROFILE PHOTO */}
      <SectionLabel label="Profile Photo" />
      {avatarPreview && (
        <Box mt={2}>
          <img
            src={avatarPreview}
            alt="Profile photo preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Box>
      )}
      <Input
        type="file"
        inputProps={{ accept: "image/*" }}
        onChange={handleAvatarChange}
      />

      {/* BASIC INFO */}
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

      {/* RELATIONSHIP TAGS */}
      <SectionLabel label="Relationship Tag(s)" />
      <Box display="flex" flexWrap="wrap" gap={1}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => toggleTag(tag)}
            style={{
              backgroundColor: state.values.relationshipTags.includes(tag)
                ? theme.palette.primary.main
                : theme.palette.secondary.light,
              color: state.values.relationshipTags.includes(tag)
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
            }}
          />
        ))}
      </Box>
      <Button variant="outlined" onClick={() => setDisplayCustomTagForm(true)}>
        Add Custom Tag
      </Button>
      <Dialog
        open={displayCustomTagForm}
        onClose={() => setDisplayCustomTagForm(false)}
      >
        <DialogTitle>Add Custom Tag</DialogTitle>
        <DialogContent>
          <TextField
            label="New Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            // fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddCustomTag}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
          <Button onClick={() => setDisplayCustomTagForm(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {state.errors?.relationshipTags && (
        <Typography color="error" fontSize="0.75rem">
          {state.errors.relationshipTags}
        </Typography>
      )}

      {/* IMPORTANT DATES */}
      <SectionLabel label="Important Dates" />
      <TextField
        label="Birthday"
        type="date"
        id="birthday"
        name="birthday"
        value={state.values.birthday}
        onChange={change}
        // InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Anniversary"
        type="date"
        id="anniversary"
        name="anniversary"
        value={state.values.anniversary}
        onChange={change}
        // InputLabelProps={{ shrink: true }}
      />

      {/* LIKES + DISLIKES */}
      <SectionLabel label="Likes" />
      {likes.map((like, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1}>
          <TextField
            fullWidth
            value={like}
            onChange={(e) => {
              const updatedLikes = [...likes];
              updatedLikes[index] = e.target.value;
              setLikes(updatedLikes);
            }}
          />
          <IconButton color="error" onClick={() => handleRemoveLike(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Box display="flex" gap={1}>
        <TextField
          label="Add Like"
          fullWidth
          value={newLike}
          onChange={(e) => setNewLike(e.target.value)}
        />
        <IconButton color="primary" onClick={handleAddLike}>
          <Add />
        </IconButton>
      </Box>

      <SectionLabel label="Dislikes" />
      {dislikes.map((dislike, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1}>
          <TextField
            fullWidth
            value={dislike}
            onChange={(e) => {
              const updatedDislikes = [...dislikes];
              updatedDislikes[index] = e.target.value;
              setDislikes(updatedDislikes);
            }}
          />
          <IconButton color="error" onClick={() => handleRemoveDislike(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Box display="flex" gap={1}>
        <TextField
          label="Add Dislike"
          fullWidth
          value={newDislike}
          onChange={(e) => setNewDislike(e.target.value)}
        />
        <IconButton color="primary" onClick={handleAddDislike}>
          <Add />
        </IconButton>
      </Box>

      {/* CONTACT INFO */}
      <SectionLabel label="Contact Info" />
      <TextField
        label="Phone Number"
        id="contactInfo.phoneNumber"
        name="contactInfo.phoneNumber"
        value={state.values.contactInfo.phoneNumber}
        onChange={handleNestedChange}
      />
      <TextField
        label="Email"
        id="contactInfo.email"
        name="contactInfo.email"
        value={state.values.contactInfo.email}
        onChange={handleNestedChange}
      />
      <TextField
        label="Address"
        id="contactInfo.address"
        name="contactInfo.address"
        value={state.values.contactInfo.address}
        onChange={handleNestedChange}
      />
      {Object.entries(state.values.contactInfo.others).map(
        ([label, value], i) => (
          <TextField
            key={i}
            label={label}
            value={value}
            onChange={(e) => handleCustomContactChange(label, e.target.value)}
          />
        )
      )}
      <Button
        variant="outlined"
        onClick={() => setDisplayCustomContactForm(true)}
      >
        Add Custom Contact Info
      </Button>
      <Dialog
        open={displayCustomContactForm}
        onClose={() => setDisplayCustomContactForm(false)}
      >
        <DialogTitle>Add Custom Contact Info</DialogTitle>
        <DialogContent>
          <TextField
            label="Label"
            value={customContactLabel}
            onChange={(e) => setCustomContactLabel(e.target.value)}
            fullWidth
          />
          <TextField
            label="Value"
            value={customContactValue}
            onChange={(e) => setCustomContactValue(e.target.value)}
            fullWidth
            style={{ marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddCustomContact}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
          <Button onClick={() => setDisplayCustomContactForm(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* ADDITIONAL INFO */}
      <SectionLabel label="Additional Info" />
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
