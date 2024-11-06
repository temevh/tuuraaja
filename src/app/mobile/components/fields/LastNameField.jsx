import TextField from "@mui/material/TextField";
const LastNameField = ({ lastName, updateLastName }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Sukunimi"
      variant="outlined"
      onChange={updateLastName}
      value={lastName}
    />
  );
};

export default LastNameField;
