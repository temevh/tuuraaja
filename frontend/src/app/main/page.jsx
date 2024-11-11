"use client";
import SubjectDropdown from "./components/SubjectDropdown";
import CalendarComponent from "./components/CalendarComponent";
import SubList from "./components/SubList";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [substitutes, setSubstitutes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchSubs = async () => {
    console.log("Selected date:", selectedDate);
    try {
      const formattedDate = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : null;
      console.log("formattedDate", formattedDate);
      const response = await axios.get("http://localhost:5000/api/getsub", {
        params: {
          subject: selectedSubject,
          date: formattedDate,
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
    //console.log("Date passed to handleDateChange:", date);
  };

  useEffect(() => {
    //console.log("Selected date updated:", selectedDate);
  }, [selectedDate]);

  return (
    <div className="min-h-screen w-full bg-green-700 flex justify-center items-center p-6">
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
        <Button onClick={fetchSubs} className="bg-green-950 w-1/4 ">
          <p className="text-white font-bold text-md">Etsi sijainen</p>
        </Button>
        <SubList substitutes={substitutes} />
      </div>
    </div>
  );
}
