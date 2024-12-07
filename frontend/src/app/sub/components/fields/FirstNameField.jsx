import TextField from "@mui/material/TextField";
const FirstNameField = ({ firstName, updateFirstName }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Etunimi"
      variant="outlined"
      onChange={updateFirstName}
      value={firstName}
    />
  );
};

export default FirstNameField;
