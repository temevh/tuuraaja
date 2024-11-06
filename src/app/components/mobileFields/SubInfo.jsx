"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import SubCalendar from "./SubCalendar";

import FirstNameField from "./FirstNameField";
import LastNameField from "./LastNameField";
import EmailField from "./EmailField";
import PhoneNumberField from "./PhoneNumberField";

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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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

  const handleChange = (event) => {
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
    console.log(selectedDates);
    try {
      const response = await axios.post("http://localhost:5000/api/addsub", {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phonenumber,
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
      <div className="pt-4">
        <FormControl sx={{ width: 300 }}>
          <InputLabel>Aineet</InputLabel>
          <Select
            multiple
            value={subjects}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {subjectList.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
