import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Timeline = () => {
  const theme = useTheme();

  return (
    <Typography component="p" color={theme.palette.secondary.dark}>
      Timeline
    </Typography>
  );
};

export default Timeline;
