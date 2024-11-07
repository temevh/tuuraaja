"use client";
import SubjectDropdown from "./components/SubjectDropdown";
import CalendarComponent from "./components/CalendarComponent";
import SubList from "./components/SubList";

import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchSubs = async () => {
    console.log("date", selectedDate);
    try {
      const response = await axios.get("http://localhost:5000/api/getsub", {
        params: {
          subject: selectedSubject,
          date: selectedDate,
        },
      });
      setSubstitutes(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching subs", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen w-full bg-amber-600 flex justify-center items-center p-6">
      <div className="w-1/2 grid grid-cols-1 gap-y-6">
        <SubjectDropdown
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
        />
        <div>
          <CalendarComponent
            onDateChange={handleDateChange}
            selectedDate={selectedDate}
          />
        </div>
        <Button onClick={fetchSubs} className="bg-amber-400 w-1/4 ">
          <p className="text-black font-bold text-md">Etsi sijainen</p>
        </Button>
        <p className="font-bold text-black text-xl">{selectedSubject}</p>
        <SubList substitutes={substitutes} />
      </div>
    </div>
  );
}
