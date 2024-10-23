import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Profile = () => {
  const theme = useTheme();
  const { profileId } = useParams();

  return (
    <Typography component="p" color={theme.palette.secondary.dark}>
      Profile
    </Typography>
  );
};

export default Profile;
