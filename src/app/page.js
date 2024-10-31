"use client";
import SubjectDropdown from "./components/filters/SubjectDropdown";
import CalendarComponent from "./components/filters/CalendarComponent";
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchSubs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/substitutes");
      setSubstitutes(response.data);
    } catch (error) {
      console.error("Error fetching subs", error);
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
        <Button onClick={fetchSubs}>Find!</Button>
        <ul>
          {substitutes.map((candidate) => (
            <li key={candidate._id.$oid}>
              {candidate.firstName} {candidate.lastName}, Subjects:{" "}
              {candidate.aineet.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
