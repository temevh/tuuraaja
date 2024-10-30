"use client";
import SubjectDropdown from "./components/filters/SubjectDropdown";
import CalendarComponent from "./components/filters/CalendarComponent";
import { useState } from "react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <div className="w-full bg-blue-400">
      <div className="w-1/2 grid grid-cols-1 gap-y-6">
        <SubjectDropdown
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
        />
        <CalendarComponent
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
    </div>
  );
}
