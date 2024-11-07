import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { updateProfileData } from '../../utilities/dbFunctions';

const LikesDislikesEdit = ({ open, onClose, person, updateProfile }) => {
  const [likes, setLikes] = useState(person.likes || []);
  const [dislikes, setDislikes] = useState(person.dislikes || []);
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");

  const handleSave = async () => {
    try {
      await updateProfileData(person.id, { likes, dislikes });
      updateProfile({ likes, dislikes });
      onClose();
    } catch (error) {
      console.error("Error saving likes and dislikes:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Likes & Dislikes</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Likes</Typography>
          {likes.map((like, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                fullWidth
                value={like}
                onChange={(e) => {
                  const newLikes = [...likes];
                  newLikes[index] = e.target.value;
                  setLikes(newLikes);
                }}
              />
              <IconButton
                color="error"
                onClick={() => setLikes(likes.filter((_, i) => i !== index))}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Add Like"
              fullWidth
              value={newLike}
              onChange={(e) => setNewLike(e.target.value)}
            />
            <IconButton
              color="primary"
              onClick={() => {
                if (newLike.trim()) {
                  setLikes([...likes, newLike.trim()]);
                  setNewLike("");
                }
              }}
            >
              <Add />
            </IconButton>
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>Dislikes</Typography>
          {dislikes.map((dislike, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                fullWidth
                value={dislike}
                onChange={(e) => {
                  const newDislikes = [...dislikes];
                  newDislikes[index] = e.target.value;
                  setDislikes(newDislikes);
                }}
              />
              <IconButton
                color="error"
                onClick={() => setDislikes(dislikes.filter((_, i) => i !== index))}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Add Dislike"
              fullWidth
              value={newDislike}
              onChange={(e) => setNewDislike(e.target.value)}
            />
            <IconButton
              color="primary"
              onClick={() => {
                if (newDislike.trim()) {
                  setDislikes([...dislikes, newDislike.trim()]);
                  setNewDislike("");
                }
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LikesDislikesEdit;
