import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const AddSubjectButton = () => {
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSubject = async () => {
    try {
      console.log("flag 1");
      const response = await axios.post(
        "http://localhost:5000/api/addsubject",
        {
          name: subjectName,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error posting subject", error);
    }

    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
