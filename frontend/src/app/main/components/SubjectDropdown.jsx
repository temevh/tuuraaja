import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";

const SubjectDropdown = ({ selectedSubject, onSubjectChange, subjects }) => {
  const handleChange = (event) => {
    onSubjectChange(event.target.value);
  };

  useEffect(() => {
    console.log(subjects);
  }, [subjects]);

  return (
    <FormControl fullWidth>
      <InputLabel id="subject-select-label">Oppiaine</InputLabel>
      <Select
        labelId="subject-select-label"
        id="subject-select"
        value={selectedSubject}
        label="Subject"
        onChange={handleChange}
      >
        {subjects.map((subject) => (
          <MenuItem key={subject.name} value={subject}>
            {subject}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubjectDropdown;
