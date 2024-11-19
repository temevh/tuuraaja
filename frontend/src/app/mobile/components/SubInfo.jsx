"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

import {
  EmailField,
  FirstNameField,
  LastNameField,
  PhoneNumberField,
  SubCalendar,
  SubjectsField,
} from "./index";

const SubInfo = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [sent, setSent] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setSubjectList(subjectNames);
        console.log("subjects", subjectNames);
        setLoading(false);
      } catch (error) {
        console.log("error loading courses", error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  /*
  const updateFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const updateLastname = (event) => {
    setLastname(event.target.value);
  };

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updateNumber = (event) => {
    setPhonenumber(event.target.value);
  };

  const updateSubjects = (event) => {
    const {
      target: { value },
    } = event;
    setSubjects(typeof value === "string" ? value.split(",") : value);
  };
  */

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhonenumber(null);
    setSubjects([]);
    setSent(true);
    setSelectedDates([]);
  };

  const handleDateChange = (date) => {
    const dateString = date.toDateString();
    const isAlreadySelected = selectedDates.some(
      (highlightedDate) => highlightedDate.toDateString() === dateString
    );

    if (isAlreadySelected) {
      setSelectedDates((prevDates) =>
        prevDates.filter(
          (highlightedDate) => highlightedDate.toDateString() !== dateString
        )
      );
    } else {
      setSelectedDates((prevDates) => [...prevDates, date]);
    }
  };

  const formatDates = (selectedDates) => {
    const pad = (number) => (number < 10 ? `0${number}` : number);

    return selectedDates.map((date) => {
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());

      return `${year}-${month}-${day}`;
    });
  };

  const sendInfo = async () => {
    try {
      const formattedDates = formatDates(selectedDates);
      console.log(formattedDates);
      const response = await axios.post("http://localhost:5000/api/addsub", {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phoneNumber,
        email: email,
        subjects: subjects,
        dates: formattedDates,
      });
      console.log(response.data);
      //resetForm();
    } catch (error) {
      console.error("Error sending info:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-green-700 flex justify-center items-center p-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex flex-col gap-6 pb-6">
            <p className="text-5xl">Valitse sopivat päivämäärät</p>
            {/*
            <FirstNameField
              firstName={firstname}
              updateFirstName={updateFirstname}
            />
            <LastNameField
              lastName={lastname}
              updateLastName={updateLastname}
            />
          </div>
          <div className="flex gap-6">
            <EmailField email={email} updateEmail={updateEmail} />
            <PhoneNumberField
              phoneNumber={phoneNumber}
              updateNumber={updateNumber}
            />
          </div>
          <SubjectsField
            subjectList={subjectList}
            selectedSubjects={subjects}
            updateSelectedSubjects={updateSubjects}
          />

          <div className="flex pb-6">
            */}
            <SubCalendar
              onDateChange={handleDateChange}
              selectedDates={selectedDates}
            />
          </div>
          <div className="bg-purple-500 mt-8 text-center">
            <Button onClick={sendInfo}>
              <p className="text-xl text-black">
                {sent ? "Tallennettu" : "Tallenna"}
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubInfo;
