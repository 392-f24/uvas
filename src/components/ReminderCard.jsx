import * as React from "react";
import {
    Card,
    Grid2,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function ReminderCard({ title, date }) {
    return (
        <Card sx={{
            px: 2,
            py: 2,
            borderRadius: 2,
            backgroundColor: "#EAEAEA",
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



export default ReminderCard;