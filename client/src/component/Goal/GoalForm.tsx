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
import { useTranslation} from "react-i18next";

/**
 *
 * @author Santiago Luna
 *
 * This component is used to create a new goal for a specific exercise
 */
export const GoalForm = () => {
  const {t} = useTranslation();
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
            {t('goal_creation')}: {state.exerciseName}
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
                <InputLabel htmlFor="goal-type-label">{t('goal_input_type')}</InputLabel>
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
                  <MenuItem value={"reps"}>{t('reps')}</MenuItem>
                  <MenuItem value={"weight"}>{t('weight')}</MenuItem>
                  <MenuItem value={"time"}>{t('time')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                {
                  {
                    reps: (
                      <TextField
                        error={!isGoalValueValid}
                        name="amount"
                        label={t('amount')}
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
                        label={t("kg")}
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
                        label={t("sec")}
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
                  label={t("start_date")}
                  isToday={true}
                  onChange={handleStartDateInput}
                />
              </FormControl>

              <FormControl>
                <ResponsiveDataPicker
                  label={t('end_date')}
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
              {t('create_goal_btn')}
            </Button>
          ) : (
            <Button disabled sx={{ margin: "10px" }}>
              {t('create_goal_btn')}
            </Button>
          )}
        </form>
      </Paper>
    </div>
  );
};
