/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { CardGiftcard, Refresh, Clear } from "@mui/icons-material";

// Custom numbered circle component
const NumberIcon = ({ number }) => (
  <Box
    sx={{
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "action.active",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "0.75rem",
      fontWeight: "medium",
    }}
  >
    {number}
  </Box>
);

const SuggestGifts = ({
  gifts = [],
  loading = false,
  onSuggestGifts,
  onClearGifts,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          Gift Suggestions
        </Typography>
        <Box>
          <IconButton size="small" onClick={onSuggestGifts} sx={{ ml: 1 }}>
            <Refresh fontSize="small" />
          </IconButton>
          {gifts.length > 0 && (
            <IconButton size="small" onClick={onClearGifts} sx={{ ml: 1 }}>
              <Clear fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      <List dense disablePadding>
        {gifts.length > 0 ? (
          gifts.map((gift, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <NumberIcon number={index + 1} />
              </ListItemIcon>
              <ListItemText primary={gift} />
            </ListItem>
          ))
        ) : (
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <CardGiftcard fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemText
              primary="Click the button to get gift suggestions"
              sx={{ color: "text.disabled" }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SuggestGifts;
