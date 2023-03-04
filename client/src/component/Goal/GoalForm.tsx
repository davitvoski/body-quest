import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import ResponsiveDataPicker from "../ResponsiveDataPicker";
import "../../styles/GoalForm.css";

export const GoalForm = (props: any) => {
  let { state } = useLocation();
  const [goalType, setGoalType] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setGoalType(event.target.value as string);
  };

  return (
    <div className="form-container">
      <Typography variant="h2" component="h2">
        CREATE GOAL FOR {state.exerciseName}
      </Typography>
      <form className="goal-form">
        <Stack justifyContent="center" alignItems="center" spacing={5}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={8}
          >
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel htmlFor="goal-type-label">Type</InputLabel>
              <Select
                autoWidth
                labelId="goal-type-label"
                id="goal-type-select"
                value={goalType}
                label="Goal"
                onChange={handleChange}
                sx={{ backgroundColor: "white" }}
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
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <FormControl>
              <ResponsiveDataPicker label={"Start Date"} />
            </FormControl>

            <FormControl>
              <ResponsiveDataPicker label={"End Date"} />
            </FormControl>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};
