"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "../../globals.css";

const CalendarComponent = ({ selectedDate, onDateChange }) => {
  const [value, setValue] = useState(new Date());

  const isHighlighted = (date) => {
    if (!selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
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

export default CalendarComponent;
