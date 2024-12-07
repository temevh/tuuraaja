import TextField from "@mui/material/TextField";

const PasswordField = ({ password, updatePassword }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Salasana"
      variant="outlined"
      onChange={updatePassword}
      value={password}
      type="password"
    />
  );
};

export default PasswordField;
