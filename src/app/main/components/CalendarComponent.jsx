"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../../globals.css";

const CalendarComponent = ({ selectedDate, onDateChange }) => {
  const [value, setValue] = useState(null);

  const isHighlighted = (date) => {
    if (!selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  const dayClicked = (date) => {
    //console.log("Date clicked:", date);
    onDateChange(date);
  };

  useEffect(() => {
    setValue(selectedDate);
  }, [selectedDate]);
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
