import React, { useState } from "react";
import Calendar from "react-calendar";

const CalendarComponent = ({ selectedDate, onDateChange }) => {
  const handleChange = (date) => {
    console.log("changed date to", date);
    onDateChange(date);
  };

  return (
    <div>
      <Calendar onChange={handleChange} value={selectedDate} />
    </div>
  );
};

export default CalendarComponent;
