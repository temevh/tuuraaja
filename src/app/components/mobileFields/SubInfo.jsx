"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const SubInfo = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(0);
  const [subject, setSubject] = useState([]);

  const theme = useTheme();

  const subjects = ["matikka", "historia", "biologia", "äidinkieli", "kemia"];

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
    setNumber(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubject(typeof value === "string" ? value.split(",") : value);
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

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
      <div className="w-full">
        <FormControl>
          <InputLabel>Aineet</InputLabel>
          <Select
            multiple
            value={subject}
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
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button className="bg-green-500 mt-8" onClick={sendInfo}>
        <p className="text-xl text-black">Lähetä!</p>
      </Button>
    </div>
  );
};

export default SubInfo;
