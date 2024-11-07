import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";
import { fetchBirthdays } from "../utilities/birthdayFunction";
import BirthdayCard from "../components/BirthdayCard";
import { Link } from "react-router-dom";

function getOrdinalNumber(age) {
  const remainder = age % 100;
  if (remainder >= 11 && remainder <= 13) {
    return `${age}th`;
  }
  switch (age % 10) {
    case 1:
      return `${age}st`;
    case 2:
      return `${age}nd`;
    case 3:
      return `${age}rd`;
    default:
      return `${age}th`;
  }
}

function formatDateToMonthDay(dateString) {
  const [month, day] = dateString.split("-").map(Number);
  const date = new Date(0, month - 1, day);

  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const Birthdays = ({ userId }) => {
  const theme = useTheme();
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    fetchBirthdays(userId)
      .then((res) => {
        setBirthdays(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: 2,
      }}
    >
      <Typography variant="h5" textAlign="left" color="black" fontWeight="bold">
        Upcoming Birthdays
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {birthdays.length > 0 ? (
          birthdays.map((birthday, index) => (
            <Link
              to={`/profile/${birthday.personId}`}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <BirthdayCard
                key={index}
                title={`${birthday.firstName}'s ${getOrdinalNumber(
                  birthday.age
                )} Birthday`}
                date={formatDateToMonthDay(birthday.date)}
              ></BirthdayCard>
            </Link>
          ))
        ) : (
          <Typography variant="body1" textAlign="left" color="textSecondary">
            No birthdays coming up
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Birthdays;
