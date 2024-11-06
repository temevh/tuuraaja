import { TextField } from "@mui/material";

const EmailField = ({ email, updateEmail }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Sähköposti"
      variant="outlined"
      onChange={updateEmail}
      value={email}
    />
  );
};

export default EmailField;
