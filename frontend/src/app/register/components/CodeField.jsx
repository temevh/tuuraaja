import { TextField } from "@mui/material";

const CodeField = ({ code, updateCode }) => {
  return (
    <TextField
      id="outlined-basic"
      label="Koulun koodi"
      variant="outlined"
      type="number"
      onChange={updateCode}
      value={code}
    />
  );
};

export default CodeField;
