import { TextField } from "@mui/material";

const PhoneNumberField = ({ phoneNumber, updateNumber }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Numero"
      variant="outlined"
      type="number"
      onChange={updateNumber}
      value={phoneNumber}
    />
  );
};

export default PhoneNumberField;
