"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

import SubCalendar from "./fields/SubCalendar";
import FirstNameField from "./fields/FirstNameField";
import LastNameField from "./fields/LastNameField";
import EmailField from "./fields/EmailField";
import PhoneNumberField from "./fields/PhoneNumberField";
import SubjectsField from "./fields/SubjectsField";

const SubInfo = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [sent, setSent] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const subjectList = [
    "Matikka",
    "Historia",
    "Biologia",
    "Äidinkieli",
    "Kemia",
  ];

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

  const updateSubjects = (event) => {
    const {
      target: { value },
    } = event;
    setSubjects(typeof value === "string" ? value.split(",") : value);
  };

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhonenumber(null);
    setSubjects([]);
    setSent(true);
    setSelectedDates([]);
  };

  const sendInfo = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/addsub", {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phoneNumber,
        email: email,
        subjects: subjects,
        dates: selectedDates,
      });
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.error("Error sending info:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-6 pb-6">
        <FirstNameField
          firstName={firstname}
          updateFirstName={updateFirstname}
        />
        <LastNameField lastName={lastname} updateLastName={updateLastname} />
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
      <div className="pt-4">
        <p className="text-black text-xl text-center mt-4">
          Valitse mahdolliset päivät
        </p>
        <SubCalendar
          onDateChange={handleDateChange}
          selectedDates={selectedDates}
        />
      </div>
      <Button className="bg-green-500 mt-8" onClick={sendInfo}>
        <p className="text-xl text-black">{sent ? "lähetetty" : "lähetä"}</p>
      </Button>
    </div>
  );
};

export default SubInfo;
