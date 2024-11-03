"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

const SubInfo = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);

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
    setNumber(event.target.value);
  };

  const sendInfo = async () => {
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(number);

    try {
      const response = await axios.post("http://localhost:5000/api/addsub", {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: number,
        email: email,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending info:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-6 pb-6">
        <TextField
          id="outlined-basic"
          label="Etunimi"
          variant="outlined"
          onChange={updateFirstname}
        />
        <TextField
          id="outlined-basic"
          label="Sukunimi"
          variant="outlined"
          onChange={updateLastname}
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
