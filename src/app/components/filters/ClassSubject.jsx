"use client";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

const ClassSubject = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const menuItems = ["Matikka", "Historia", "Biologia", "Äidinkieli"];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Oppiaine</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedSubject}
          label="Subject"
          onChange={handleChange}
        >
          {menuItems.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClassSubject;
