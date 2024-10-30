"use client";
import SubjectDropdown from "./components/filters/SubjectDropdown";
import CalendarComponent from "./components/filters/CalendarComponent";
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [candidates, setCandidates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchSubs = async (first_name) => {
    console.log("finding subs...");
    try {
      const response = await axios.get("http://localhost:5000/api/substitute", {
        params: {
          first_name: first_name,
        },
      });
      setCandidates(response.data);
    } catch (err) {
      console.log(err);
    }
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
        <Button onClick={fetchSubs("Alisa")}>Find!</Button>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              {candidate.name} - {candidate.phone_number} - Subjects:{" "}
              {candidate.subjects}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
