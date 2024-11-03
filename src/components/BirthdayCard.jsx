import * as React from "react";
import { useTheme, alpha } from "@mui/material/styles";
import {
    Card,
    Grid2,
    Typography,
} from "@mui/material";

function BirthdayCard({ title, date }) {
    const theme = useTheme();

    return (
        <Card sx={{
            px: 2,
            py: 2,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.primary.light, 0.5),
            boxShadow: "none"
        }}>
            <Grid2 container direction="column">
                <Grid2>
                    <Typography variant="h6" textAlign="left" color="black">
                        {title}
                    </Typography>
                </Grid2>
                <Grid2>
                    <Typography variant="body1" textAlign="left" color="textSecondary">
                        {date}
                    </Typography>
                </Grid2>
            </Grid2>
        </Card>
    );
}



export default BirthdayCard;