"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";

const SubName = () => {
  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");

  const updateEtunimi = (event) => {
    setEtunimi(event.target.value);
    console.log(etunimi);
  };

  const updateSukunimi = (event) => {
    setSukunimi(event.target.value);
    console.log(sukunimi);
  };

  return (
    <div className="flex gap-6">
      <TextField
        id="outlined-basic"
        label="Etunimi"
        variant="outlined"
        onChange={updateEtunimi}
      />
      <TextField
        id="outlined-basic"
        label="Sukunimi"
        variant="outlined"
        onChange={updateSukunimi}
      />
    </div>
  );
};

export default SubName;
