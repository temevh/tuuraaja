"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "./SubCalendar.css";

const SubCalendar = () => {
  const [value, setValue] = useState(new Date());

  const highlightedDates = [
    new Date(2024, 10, 5),
    new Date(2024, 10, 10),
    new Date(2024, 10, 15),
  ];

  const isHighlighted = (date) => {
    return highlightedDates.some(
      (highlightedDate) =>
        date.getFullYear() === highlightedDate.getFullYear() &&
        date.getMonth() === highlightedDate.getMonth() &&
        date.getDate() === highlightedDate.getDate()
    );
  };

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
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
