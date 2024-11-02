"use client";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { fiFI } from "@mui/x-date-pickers/locales";

const CalendarComponent = ({ onDateChange }) => {
  const [value, setValue] = useState(dayjs());

  const handleDateChange = (newValue) => {
    setValue(newValue);
    onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
      <DateCalendar
        value={value}
        onChange={handleDateChange}
        displayWeekNumber
      />
    </LocalizationProvider>
  );
};

export default CalendarComponent;
