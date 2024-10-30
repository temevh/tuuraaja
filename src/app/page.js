"use client";
import SubjectDropdown from "./components/filters/SubjectDropdown";
import CalendarComponent from "./components/filters/CalendarComponent";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchSubs = async () => {
    console.log("finding subs...");
  };

  return (
    <div className="w-full bg-amber-600">
      <div className="w-1/2 grid grid-cols-1 gap-y-6">
        <SubjectDropdown
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
        />
        <CalendarComponent
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <Button onClick={fetchSubs}>Find!</Button>
      </div>
    </div>
  );
}
