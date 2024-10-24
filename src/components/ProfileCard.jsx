import * as React from "react";
import {
    Card,
    Box,
    Grid2,
    Avatar,
    Typography,
    Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function ProfileCard({ name, occupation, tags }) {
    return (
        <Card sx={{
            paddingX: 2,
            paddingY: 2,
            borderRadius: 2,
            // margin: 2,
            backgroundColor: "#EAEAEA",
            boxShadow: "none"
        }}>
            <Grid2 container spacing={2} alignItems="center">
                <Grid2 item xs={3}>
                    <Avatar sx={{ width: 64, height: 64 }} />
                </Grid2>
                <Grid2 item xs={9}>
                    <Grid2 container direction="column">
                        <Grid2 item>
                            <Typography variant="h6" textAlign="left" color="black">
                                {name}
                            </Typography>
                        </Grid2>
                        <Grid2 item>
                            <Typography variant="body1" textAlign="left" color="textSecondary">
                                {occupation}
                            </Typography>
                        </Grid2>
                        <Grid2 item sx={{ mt: 2 }}>
                            <Grid2 container direction="row" spacing={1}>
                                {tags.map((tag, index) => (
                                    <Chip key={index} label={tag} color="primary" />
                                ))}
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Card>
    );
}



export default ProfileCard;