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
import { updateLikesDislikes } from '../../utilities/dbFunctions';


const LikesDislikesEdit = ({ open, onClose, person, updateProfile, userId}) => {
  // Initialize state with existing likes and dislikes, if any
  const [likes, setLikes] = useState(person.likes || []);
  const [dislikes, setDislikes] = useState(person.dislikes || []);
  const [newLike, setNewLike] = useState("");
  const [newDislike, setNewDislike] = useState("");

  // Function to handle saving the updated likes and dislikes
//   const handleSave = async () => {
//     try {
//       await updateLikesDislikes("User1", person.id, likes, dislikes); // Call the backend function with user and person IDs
//       updateProfile({ likes, dislikes }); // Update local state in Profile component
//       onClose(); // Close the modal after saving
//     } catch (error) {
//       console.error("Error saving likes/dislikes:", error);
//     }
//   };
  const handleSave = async () => {
    try {
      // Call the backend function to update likes/dislikes in Firestore
      await updateLikesDislikes(userId, person.id, likes, dislikes);

      // Update the frontend profile with new likes and dislikes
      updateProfile({
        likes,
        dislikes,
      });

      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving likes and dislikes:", error);
    }
  };

  const handleAddLike = () => {
    if (newLike) {
      setLikes([...likes, newLike]);
      setNewLike("");
    }
  };

  const handleAddDislike = () => {
    if (newDislike) {
      setDislikes([...dislikes, newDislike]);
      setNewDislike("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Likes & Dislikes</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {/* Likes Section */}
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

          {/* Dislikes Section */}
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
