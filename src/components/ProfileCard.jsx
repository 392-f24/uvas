import * as React from "react";
import {
    Card,
    Box,
    Grid2,
    Avatar,
    Typography,
    Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function ProfileCard({ firstName, lastName, occupation, tags, avatar }) {
    const getInitials = () => {
        return `${firstName[0]}${lastName ? lastName[0] : ""}`.toUpperCase();
    };

    return (
        <Card sx={{
            px: 2,
            py: 2,
            borderRadius: 2,
            backgroundColor: "#EAEAEA",
            boxShadow: "none"
        }}>
            <Grid2 container spacing={2} alignItems="center">
                <Grid2 xs={3}>
                    <Avatar
                        src={avatar}
                        alt={firstName}
                        sx={{ width: 60, height: 60, bgcolor: "primary.dark" }}
                    >
                        {getInitials()}
                    </Avatar>
                </Grid2>
                <Grid2 xs={9}>
                    <Grid2 container direction="column">
                        <Grid2>
                            <Typography variant="h6" textAlign="left" color="black">
                                {firstName} {lastName}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1" textAlign="left" color="textSecondary">
                                {occupation}
                            </Typography>
                        </Grid2>
                        <Grid2 sx={{ mt: 1 }}>

                            <Grid2 container direction="row" spacing={1}>
                                {tags && tags.map((tag, index) => (
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