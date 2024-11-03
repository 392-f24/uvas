import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Typography,
  Box
} from "@mui/material";
import { fetchReminders } from "../utilities/reminderFunction";
import BirthdayCard from "../components/BirthdayCard";

const Birthdays = () => {
  const theme = useTheme();
  // const [birthdays, setBirthdays] = useState([]);

  const birthdays = [
    {
      title: "Charlie's Birthday",
      date: "June 23",
    },
    {
      title: "John's Birthday",
      date: "June 24",
    },
    {
      title: "Sarah's Birthday",
      date: "June 25",
    },
    {
      title: "Michael's Birthday",
      date: "June 26",
    }
  ];

  // useEffect(() => {
  //   fetchReminders("User1").then((res) => {
  //     setBirthdays(res);
  //   }).catch((err) => (console.log(err)))
  // }, [])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: 2,
      }}>
      <Typography variant="h5" textAlign="left" color="black" fontWeight="bold">
        Birthdays
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {birthdays.map((reminder, index) => (
          <BirthdayCard
            key={index}
            title={reminder.title}
            date={reminder.date}>
          </BirthdayCard>
        ))}
      </Box>
    </Box >
  );
};

export default Birthdays;
