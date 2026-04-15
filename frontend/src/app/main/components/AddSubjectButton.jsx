import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MuiButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import Button from "../../components/Button";

const AddSubjectButton = () => {
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
    setErrorMessage("");
    setSubjectName("");
  };

  const handleAddSubject = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/addsubject",
        { name: subjectName },
      );

      const exists = response.data.exists;
      if (exists === "true") {
        setError(true);
        setErrorMessage("Oppiaine on jo lisätty");
      } else if (exists !== "true") {
        handleClose();
      }
    } catch (error) {
      console.error("Error posting subject:", error);
      alert("An error occurred while adding the subject");
    }
  };

  return (
    <div>
      <Button variant="secondary" size="md" onClick={handleClickOpen}>
        Lisää oppiaine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Lisää uusi oppiaine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Oppiaine"
            type="text"
            fullWidth
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            error={error}
            helperText={error ? errorMessage : ""}
          />
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleClose} color="primary">
            Sulje
          </MuiButton>
          <MuiButton onClick={handleAddSubject} color="primary">
            Lisää
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSubjectButton;
