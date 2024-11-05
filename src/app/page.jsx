"use client";
import SubjectDropdown from "./components/filters/SubjectDropdown";
import CalendarComponent from "./components/filters/CalendarComponent";
import SubList from "./components/list/SubList";

import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchSubs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/substitutes",
        {
          params: {
            subject: selectedSubject,
            date: selectedDate,
          },
        }
      );
      setSubstitutes(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching subs", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-amber-600 flex justify-center items-center p-6">
      <div className="w-1/2 grid grid-cols-1 gap-y-6">
        <SubjectDropdown
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
        />
        <div>
          <CalendarComponent onDateChange={setSelectedDate} />
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
