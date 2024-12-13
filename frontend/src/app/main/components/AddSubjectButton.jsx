import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

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
      console.log("Attempting to add subject:", subjectName);
      const response = await axios.post(
        "http://localhost:5000/api/addsubject",
        { name: subjectName }
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
      <button
        variant="contained"
        className="bg-gradientpurple rounded-lg p-2 hover:bg-gradientpink transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        onClick={handleClickOpen}
      >
        Lisää oppiaine
      </button>
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
          <Button onClick={handleClose} color="primary">
            Sulje
          </Button>
          <Button onClick={handleAddSubject} color="primary">
            Lisää
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSubjectButton;
