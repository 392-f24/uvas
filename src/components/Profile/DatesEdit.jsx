/* eslint-disable react/prop-types */
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
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

function convertToMMDDYYYY(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
}

const DatesEdit = ({ open, onClose, person, updateProfile }) => {
    // State for the input values
    const [birthday, setBirthday] = useState(person.birthday || "");
    const [anniversary, setAnniversary] = useState(person.anniversary || "");

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Important Dates</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Birthday"
                        type="date"
                        defaultValue={
                            person.birthday
                                ? person.birthday.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$1-$2')
                                : ""
                        }
                        fullWidth
                        onChange={(e) => setBirthday(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Anniversary"
                        type="date"
                        defaultValue={
                            person.anniversary
                                ? person.anniversary.replace(/(\d{2})-(\d{2})-(\d{4})/, '$3-$1-$2')
                                : ""
                        }
                        fullWidth
                        onChange={(e) => setAnniversary(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        const newProfile = {};
                        if (birthday) newProfile.birthday = convertToMMDDYYYY(birthday);
                        if (anniversary) newProfile.anniversary = convertToMMDDYYYY(anniversary);
                        updateProfile(newProfile);
                        onClose();
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DatesEdit;
