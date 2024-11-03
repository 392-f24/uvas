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
                        defaultValue={person.birthday}
                        fullWidth
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                    <TextField
                        label="Anniversary"
                        defaultValue={person.anniversary}
                        fullWidth
                        onChange={(e) => setAnniversary(e.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        updateProfile({ birthday, anniversary });
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
