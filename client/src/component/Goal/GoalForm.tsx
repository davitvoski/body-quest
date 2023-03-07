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
import ResponsiveDataPicker from "../ResponsiveDataPicker";
import "../../styles/GoalForm.css";

export const GoalForm = (props: any) => {
  let { state } = useLocation();
  const [goalType, setGoalType] = React.useState("");
  const [goalValue, setGoalValue] = React.useState("");
  const [dateValue, setDateValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [errors, setErrors] = React.useState({ goalValue: "", endDate: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    console.log(name);

    switch (name) {
      case "type":
        setGoalType(event.target.value as string);
        break;
      case "amount":
        if (event.target.value.length > 0) {
          setGoalValue(event.target.value as string);
        } else {
        }
        break;
      case "date":
        setDateValue(event.target.value as string);
        break;
    }
  };

  const checkFormValid = () => {
    if (goalValue !== "") {
      setIsValid(true);
    }
  };

  function handleDateChange(newValue: any) {
    console.log(newValue);
  }

  const handleGoalValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoalValue(event.target.value as string);
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
                        required
                        name="amount"
                        label="Amount"
                        id="goal-amount-input"
                        variant="filled"
                        type="number"
                        inputProps={{ min: 0 }}
                        sx={{ color: "white" }}
                        onChange={handleChange}
                      />
                    ),
                    weight: (
                      <TextField
                        name="amount"
                        label="Kg"
                        id="goal-amount-input"
                        variant="filled"
                        type="number"
                        inputProps={{ min: 0 }}
                        onChange={handleChange}
                      />
                    ),
                    time: (
                      <TextField
                        label="Sec"
                        name="amount"
                        id="goal-amount-input"
                        variant="filled"
                        type="number"
                        inputProps={{
                          min: 0,
                        }}
                        onChange={handleChange}
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
                <ResponsiveDataPicker label={"Start Date"} isToday={true} />
              </FormControl>

              <FormControl>
                <ResponsiveDataPicker
                  label={"End Date"}
                  isToday={false}
                  onChange={handleDateChange}
                />
              </FormControl>
            </Stack>
          </Stack>
          {isValid ? (
            <Button variant="contained">Create</Button>
          ) : (
            <Button disabled>Create</Button>
          )}
        </form>
      </Paper>
    </div>
  );
};
