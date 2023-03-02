import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Stack,
  Grid,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import "../../styles/GoalForm.css";
import ResponsiveDataPicker from "../ResponsiveDataPicker";

type GoalFormProps = {
  handleClose: () => void;
  exerciseName: string;
  open: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GoalForm = (props: GoalFormProps) => {
  const { handleClose, open, exerciseName } = props;
  const [goalType, setGoalType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGoalType(event.target.value as string);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {exerciseName}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <form className="goal-form">
            <Stack spacing={5}>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel htmlFor="goal-type-label">Type</InputLabel>
            <Select
              autoWidth
              labelId="goal-type-label"
              id="goal-type-select"
              value={goalType}
              label="Goal"
              onChange={handleChange}
            >
              <MenuItem value={"reps"}>Reps</MenuItem>
              <MenuItem value={"weight"}>Weight</MenuItem>
              <MenuItem value={"time"}>Time</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              label="Amount"
              id="goal-amount-input"
              variant="outlined"
              type="number"
              inputProps={{ min: 0 }}
            />
          </FormControl>
          <Grid container spacing={3}>
        <Grid item xs={5}>
            <FormControl>
            <ResponsiveDataPicker label={"Start Date"}/>
          </FormControl>
            </Grid>
          
            <Grid item xs={5}>
            <FormControl>
            <ResponsiveDataPicker label={"End Date"}/>
          </FormControl>
            </Grid>
          </Grid>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
