/* eslint-disable react/prop-types */
import { Box, Typography, Avatar, Chip } from "@mui/material";
import EditButton from "./EditButton";
import EmptyState from "./EmptyState";

const BasicInfoHeader = ({
  firstName,
  lastName,
  avatar,
  relationshipTags,
  OnEdit,
}) => {
  const getInitials = () => {
    return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
      <Avatar
        src={avatar}
        alt={firstName}
        sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
      >
        {getInitials()}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {firstName} {lastName}
          </Typography>
          <EditButton onClick={OnEdit} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {relationshipTags?.length > 0 ? (
            relationshipTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="primary"
                size="small"
                sx={{ "&.MuiChip-root": { fontWeight: 500 } }}
              />
            ))
          ) : (
            <EmptyState text="Add tags" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BasicInfoHeader;
