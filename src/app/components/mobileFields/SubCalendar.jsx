"use client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";

const SubCalendar = () => {
  const [selectedDates, setSelectedDate] = useState([[]]);
  const onDateClick = () => {};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
      <DateCalendar displayWeekNumber />
    </LocalizationProvider>
  );
};

export default SubCalendar;
