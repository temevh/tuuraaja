"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const SubInfo = () => {
  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);

  const updateEtunimi = (event) => {
    setEtunimi(event.target.value);
  };

  const updateSukunimi = (event) => {
    setSukunimi(event.target.value);
  };

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updateNumber = (event) => {
    setNumber(event.target.value);
  };

  const sendInfo = () => {
    console.log(etunimi);
    console.log(sukunimi);
    console.log(email);
    console.log(number);
  };

  return (
    <div>
      <div className="flex gap-6 pb-6">
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
      <div className="flex gap-6">
        <TextField
          id="outlined-basic"
          label="Sähköposti"
          variant="outlined"
          onChange={updateEmail}
        />
        <TextField
          id="outlined-basic"
          label="Numero"
          variant="outlined"
          type="number"
          onChange={updateNumber}
        />
      </div>
      <Button className="bg-green-500 mt-8" onClick={sendInfo}>
        <p className="text-xl text-black">Lähetä!</p>
      </Button>
    </div>
  );
};

export default SubInfo;
