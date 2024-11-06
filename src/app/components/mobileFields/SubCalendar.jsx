"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "./SubCalendar.css";

const SubCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);

  const isHighlighted = (date) => {
    return selectedDates.some(
      (highlightedDate) =>
        date.getFullYear() === highlightedDate.getFullYear() &&
        date.getMonth() === highlightedDate.getMonth() &&
        date.getDate() === highlightedDate.getDate()
    );
  };

  const dayClicked = (date) => {
    const dateString = date.toDateString();
    const isAlreadySelected = selectedDates.some(
      (highlightedDate) => highlightedDate.toDateString() === dateString
    );

    if (isAlreadySelected) {
      setSelectedDates((prevDates) =>
        prevDates.filter(
          (highlightedDate) => highlightedDate.toDateString() !== dateString
        )
      );
    } else {
      setSelectedDates((prevDates) => [...prevDates, date]);
    }
  };

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={dayClicked}
        tileClassName={({ date, view }) => {
          if (view === "month" && isHighlighted(date)) {
            return "highlight";
          }
        }}
      />
    </div>
  );
};

export default SubCalendar;
