import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarOrigin,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import ResponsiveDataPicker from "./ResponsiveDataPicker";
import "../../styles/GoalForm.css";
import { useState } from "react";
import axios from "axios";
import { IGoal } from "../../../../shared";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/Post.css";
import { useMediaQuery } from "react-responsive";
/**
 *
 * @author Santiago Luna
 *
 * This component is used to create a new goal for a specific exercise
 */

export const GoalForm = () => {
  const { t } = useTranslation();
  let { state } = useLocation();
  const [goalType, setGoalType] = useState(state.type as string);
  const [goalValue, setGoalValue] = useState(0);
  const [isGoalValueValid, setIsGoalValueValid] = useState(false);
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().format("DD-MM-YYYY"));
  const [endDate, setEndDate] = useState("");
  const [endDateAfterStartDate, setEndDateAfterStartDate] = useState(false);

  dayjs.extend(customParseFormat);
  let navigate = useNavigate();

  const handleGoalValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.valueAsNumber;
    setGoalValue(value);
    if (value) {
      setIsGoalValueValid(true);
    } else {
      setIsGoalValueValid(false);
    }
  };

  function handleStartDateInput(newValue: any) {
    if (newValue !== null) {
      if (!Number.isNaN(newValue.$y)) {
        setIsStartDateValid(true);
        setStartDate(
          formatDate(`${newValue.$D}-${newValue.$M + 1}-${newValue.$y}`)
        );
      } else {
        setIsStartDateValid(false);
      }
    } else {
      setIsStartDateValid(false);
    }
  }

  // formats the date string into usable format to compare
  function formatDate(date: string) {
    return dayjs(date, ["D-M-YYYY", "DD-MM-YYYY"]).format("DD-MM-YYYY");
  }

  // handles end date validation
  // TODO: fix bug where end date is not valid if on different month
  function handleEndDateInput(newValue: any) {
    if (newValue !== null) {
      if (!Number.isNaN(newValue.$y)) {
        let currentEndDate = formatDate(
          `${newValue.$D}-${newValue.$M + 1}-${newValue.$y}`
        );

        if (currentEndDate > startDate) {
          setIsEndDateValid(true);
          setEndDateAfterStartDate(true);
          setEndDate(currentEndDate);
        } else {
          setIsEndDateValid(false);
          setEndDateAfterStartDate(false);
        }
      } else {
        setIsEndDateValid(false);
      }
    } else {
      setIsEndDateValid(false);
    }
  }

  const createGoal = async (newGoal: IGoal) => {
    try {
      await axios.post("/api/goals", {
        goal: newGoal,
      });
      navigate("/", { state: { goalCreated: true } });
    } catch (error: any) {
      enqueueSnackbar("Failed to create goal", {
        autoHideDuration: 2000,
        preventDuplicate: true,
        variant: "error",
      });
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    // TODO: find better way to track ID
    const newGoal: IGoal = {
      id: Date.now(),
      exercise: state.exerciseName,
      type: goalType,
      goal: goalValue,
      startDate: startDate,
      endDate: endDate,
      completed: false,
    };
    await createGoal(newGoal);
  };
  /**
   * close the add goal form
   */
  const closeGoalForm = () => {
    navigate("/");
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <>
      {isDesktopOrLaptop && (
        <div className="form-container">
          <SnackbarProvider
            autoHideDuration={2000}
            maxSnack={1}
            preventDuplicate
          />
          <Paper elevation={3} sx={{ maxWidth: "50%" }}>
            <div className="header" id="addPost">
              <Typography
                variant="h4"
                component="h4"
                sx={{ textTransform: "uppercase" }}
              >
                {t("goal_creation")}: {state.exerciseName}
              </Typography>
              {/* colse goal form when click X icon */}
              <IconButton
                id="cancelbtn"
                sx={{ color: "white" }}
                title={t("close") as string}
                onClick={closeGoalForm}
              >
                <CloseIcon />
              </IconButton>
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
                    <InputLabel htmlFor="goal-type-label">
                      {t("goal_input_type")}
                    </InputLabel>
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
                      <MenuItem value={"reps"}>{t("reps")}</MenuItem>
                      <MenuItem value={"weight"}>{t("weight")}</MenuItem>
                      <MenuItem value={"time"}>{t("time")}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    {
                      {
                        reps: (
                          <TextField
                            error={!isGoalValueValid}
                            name="amount"
                            label={t("amount")}
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
                            inputProps={{ min: 0 }}
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                  }}
                >
                  <FormControl>
                    <ResponsiveDataPicker
                      label={t("start_date")}
                      isToday={true}
                      onChange={handleStartDateInput}
                      endAfterStart={true}
                    />
                  </FormControl>

                  <FormControl>
                    <ResponsiveDataPicker
                      label={t("end_date")}
                      isToday={false}
                      onChange={handleEndDateInput}
                      endAfterStart={endDateAfterStartDate}
                    />
                  </FormControl>
                </Stack>
              </Stack>
              {isGoalValueValid && isStartDateValid && isEndDateValid ? (
                <Button
                  variant="contained"
                  sx={{
                    margin: "10px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onClick={handleSubmit}
                >
                  {t("create_goal_btn")}
                </Button>
              ) : (
                <Button disabled sx={{ margin: "10px" }}>
                  {t("create_goal_btn")}
                </Button>
              )}
            </form>
          </Paper>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="form-container">
          <SnackbarProvider
            autoHideDuration={2000}
            maxSnack={1}
            preventDuplicate
          />
          <Paper elevation={3}>
            <div className="header" id="addPost">
              <Typography
                variant="h4"
                component="h4"
                sx={{ textTransform: "uppercase" }}
              >
                {t("goal_creation")}: {state.exerciseName}
              </Typography>
              {/* colse goal form when click X icon */}
              <IconButton
                id="cancelbtn"
                sx={{ color: "white" }}
                title={t("close") as string}
                onClick={closeGoalForm}
              >
                <CloseIcon />
              </IconButton>
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
                    <InputLabel htmlFor="goal-type-label">
                      {t("goal_input_type")}
                    </InputLabel>
                    <Select
                      autoWidth
                      labelId="goal-type-label"
                      id="goal-type-select"
                      value={goalType}
                      label="Goal"
                      sx={{ overflow: "visible" }}
                      onChange={(event: SelectChangeEvent) => {
                        setGoalType(event.target.value as string);
                      }}
                    >
                      <MenuItem value={"reps"}>{t("reps")}</MenuItem>
                      <MenuItem value={"weight"}>{t("weight")}</MenuItem>
                      <MenuItem value={"time"}>{t("time")}</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    {
                      {
                        reps: (
                          <TextField
                            error={!isGoalValueValid}
                            name="amount"
                            label={t("amount")}
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
                            inputProps={{ min: 0 }}
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                  }}
                >
                  <FormControl>
                    <ResponsiveDataPicker
                      label={t("start_date")}
                      isToday={true}
                      onChange={handleStartDateInput}
                      endAfterStart={true}
                    />
                  </FormControl>

                  <FormControl>
                    <ResponsiveDataPicker
                      label={t("end_date")}
                      isToday={false}
                      onChange={handleEndDateInput}
                      endAfterStart={endDateAfterStartDate}
                    />
                  </FormControl>
                </Stack>
              </Stack>
              {isGoalValueValid && isStartDateValid && isEndDateValid ? (
                <Button
                  variant="contained"
                  sx={{
                    margin: "10px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onClick={handleSubmit}
                >
                  {t("create_goal_btn")}
                </Button>
              ) : (
                <Button disabled sx={{ margin: "10px" }}>
                  {t("create_goal_btn")}
                </Button>
              )}
            </form>
          </Paper>
        </div>
      )}
    </>
  );
};
