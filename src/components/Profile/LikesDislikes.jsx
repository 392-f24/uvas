// LikesDislikes.jsx
import { Box, Typography, List, ListItem, ListItemText, IconButton, ListItemIcon } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const LikesDislikes = ({ likes = [], dislikes = [], onEdit }) => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold" color="primary">
        Likes & Dislikes
      </Typography>
      <IconButton onClick={onEdit} size="small" sx={{ ml: 1 }}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
    <List dense disablePadding>
      <ListItem>
        <ListItemIcon>
            <ThumbUpIcon color="action" fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Likes" secondary={likes.length > 0 ? likes.join(", ") : "No likes added"} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
            <ThumbDownIcon color="action" fontSize="small" />
        </ListItemIcon>

        <ListItemText primary="Dislikes" secondary={dislikes.length > 0 ? dislikes.join(", ") : "No dislikes added"} />
      </ListItem>
    </List>
  </Box>
);

export default LikesDislikes;
