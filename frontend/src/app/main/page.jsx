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
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      console.log("loaded site");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getsubjects"
        );
        const tempSub = response.data;
        console.log("tempSub", tempSub);
        const subjectNames = tempSub.map((subject) => subject.name);
        setSubjects(subjectNames);
        console.log("subjects", subjectNames);
        setLoading(false);
      } catch (error) {
        console.log("error loading courses", error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const formatDates = (selectedDates) => {
    const pad = (number) => (number < 10 ? `0${number}` : number);

    const year = selectedDates.getFullYear();
    const month = pad(selectedDates.getMonth() + 1);
    const day = pad(selectedDates.getDate());

    return `${year}-${month}-${day}`;
  };

  const fetchSubs = async () => {
    console.log("Selected date:", selectedDate);
    try {
      const formattedDate = formatDates(selectedDate);
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
  };

  useEffect(() => {}, [selectedDate]);

  return (
    <div className="min-h-screen w-full bg-green-700 flex justify-center items-center p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-1/2 grid grid-cols-1 gap-y-6">
          <SubjectDropdown
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
            subjects={subjects}
          />
          <div>
            <CalendarComponent
              onDateChange={handleDateChange}
              selectedDate={selectedDate}
            />
          </div>
          <Button
            onClick={fetchSubs}
            sx={{
              backgroundColor: "#6eb087",
              width: "25%",
              "&:hover": {
                backgroundColor: "lightgray",
              },
            }}
          >
            <p className="text-black font-bold text-md">Etsi sijainen</p>
          </Button>
          <SubList substitutes={substitutes} />
        </div>
      )}
    </div>
  );
}
