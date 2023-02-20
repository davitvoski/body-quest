import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Popup } from "../Popup";

export const DetailView = () => {
  const [exercise, setExercise] = useState();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./src/data/exercise.json");
      const data = await response.json();
      console.log(data);
      setExercise(data);
    };
    fetchData().catch(console.error);
  }, []);

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="detailView">
      {exercise && (
        <Button variant="contained" onClick={handlePopup}>
          {exercise.name}
        </Button>
      )}
      {isOpen && <Popup handleClose={handlePopup} exercise={exercise} />}
    </div>
  );
};
