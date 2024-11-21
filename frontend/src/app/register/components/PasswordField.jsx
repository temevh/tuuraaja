import TextField from "@mui/material/TextField";

const PasswordField = ({ password, updatePassword }) => {
  return (
    <div className="w">
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={updatePassword}
        value={password}
      />
    </div>
  );
};

export default PasswordField;
