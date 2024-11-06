"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "./SubCalendar.css";

const SubCalendar = ({ selectedDates, onDateChange }) => {
  const [value, setValue] = useState(new Date());

  const isHighlighted = (date) => {
    return selectedDates.some(
      (highlightedDate) =>
        date.getFullYear() === highlightedDate.getFullYear() &&
        date.getMonth() === highlightedDate.getMonth() &&
        date.getDate() === highlightedDate.getDate()
    );
  };

  const dayClicked = (date) => {
    onDateChange(date);
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
