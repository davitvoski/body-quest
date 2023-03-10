import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import ResponsiveDataPicker from "./ResponsiveDataPicker";
import "../../styles/GoalForm.css";
import { useState } from "react";

/**
 *
 * @author Santiago Luna
 *
 * This component is used to create a new goal for a specific exercise
 */
export const GoalForm = () => {
  let { state } = useLocation();
  const [goalType, setGoalType] = useState("");
  const [goalValue, setGoalValue] = useState(0);
  const [isGoalValueValid, setIsGoalValueValid] = useState(false);
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(false);

  const handleGoalValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.valueAsNumber;
    console.log(value.toString());
    setGoalValue(value);
    if (value) {
      setIsGoalValueValid(true);
      console.log("valid");
    } else {
      setIsGoalValueValid(false);
    }
  };

  function handleStartDateInput(newValue: any) {
    if (newValue !== null) {
      if (!Number.isNaN(newValue.$y)) {
        setIsStartDateValid(true);
      } else {
        setIsStartDateValid(false);
      }
    } else {
      setIsStartDateValid(false);
    }
  }

  function handleEndDateInput(newValue: any) {
    if (newValue !== null) {
      if (!Number.isNaN(newValue.$y)) {
        setIsEndDateValid(true);
      } else {
        setIsEndDateValid(false);
      }
    } else {
      setIsEndDateValid(false);
    }
  }

  const handleSubmit = () => {
    console.log("submit");
    //TODO post request to server
  };

  return (
    <div className="form-container">
      <Paper elevation={3} sx={{ maxWidth: "50%" }}>
        <div className="header">
          <Typography variant="h4" component="h4">
            Goal Creation: {state.exerciseName}
          </Typography>
        </div>
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
                  onChange={(event: SelectChangeEvent) => {
                    setGoalType(event.target.value as string);
                  }}
                >
                  <MenuItem value={"reps"}>Reps</MenuItem>
                  <MenuItem value={"weight"}>Weight</MenuItem>
                  <MenuItem value={"time"}>Time</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                {
                  {
                    reps: (
                      <TextField
                        error={!isGoalValueValid}
                        name="amount"
                        label="Amount"
                        id="goal-amount-input"
                        variant="filled"
                        type="number"
                        inputProps={{ min: 0 }}
                        sx={{ color: "white" }}
                        onChange={handleGoalValueChange}
                      />
                    ),
                    weight: (
                      <TextField
                        error={!isGoalValueValid}
                        name="amount"
                        label="Kg"
                        id="goal-amount-input"
                        variant="filled"
                        type="number"
                        inputProps={{ min: 0 }}
                        onChange={handleGoalValueChange}
                      />
                    ),
                    time: (
                      <TextField
                        error={!isGoalValueValid}
                        label="Sec"
                        name="amount"
                        id="goal-amount-input"
                        variant="filled"
                        type="number"
                        inputProps={{
                          min: 0,
                        }}
                        onChange={handleGoalValueChange}
                      />
                    ),
                  }[goalType]
                }
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={5}
            >
              <FormControl>
                <ResponsiveDataPicker
                  label={"Start Date"}
                  isToday={true}
                  onChange={handleStartDateInput}
                />
              </FormControl>

              <FormControl>
                <ResponsiveDataPicker
                  label={"End Date"}
                  isToday={false}
                  onChange={handleEndDateInput}
                />
              </FormControl>
            </Stack>
          </Stack>
          {isGoalValueValid && isStartDateValid && isEndDateValid ? (
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "black", color: "white" }}
              onClick={handleSubmit}
            >
              Create
            </Button>
          ) : (
            <Button disabled sx={{ margin: "10px" }}>
              Create
            </Button>
          )}
        </form>
      </Paper>
    </div>
  );
};
