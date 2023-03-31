import SearchIcon from "@mui/icons-material/Search";
import { Box, FormControl, InputBase, InputLabel, OutlinedInputProps, styled, TextField, TextFieldProps, Typography } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useTranslation } from "react-i18next";
import "../../styles/Search.css";
type searchProps = {
  setExercise: Function;
  allExercises: IExercise[];
  isMobile?: boolean;
};

const StyledTextField = styled(TextField)(({ theme }) => ({
    label: "Filter exercises by key word",
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      border: 'none',
      fontSize: 20,
      width: '100%',
      height: "2.5rem",
      padding: "0.5rem",
      fontFamily: [
        'Silkscreen',
      ].join(',')
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    }
  }));

/**
 * This feature allow user to serach exercises they want
 * @param props searchProps
 * @returns search bar
 */
export const Search = (props: searchProps) => {
  const { t } = useTranslation();
  const width = !props.isMobile ? "100%" : "90%";

  /**
   * Will list all exercises based on the values entered by the user.
   * @param event 
   */
  const getSearchValue = (event: any) => {
    event.preventDefault();
    const searchExercise = event.target.value.toLowerCase();
    let isBlank = /^\s*$/;
    // if the serach bar is blank will show all the exercise
    if (searchExercise.length == 0 || searchExercise.match(isBlank)) {
      props.setExercise(props.allExercises);
    } else {
      // filter all exercises accroding to value that user enter
      const exercises = props.allExercises.filter(
        (exercise) =>
          exercise.name.includes(searchExercise) ||
          exercise.body_part.includes(searchExercise) ||
          exercise.equipment.includes(searchExercise) ||
          exercise.target.includes(searchExercise)
      );
      if (exercises != undefined) {
        props.setExercise(exercises);
      }
    }
  };

  return (
    <Box
      alignSelf="center"
      color="background.default"
      padding={"5%"}
      width={"100%"}>
        <StyledTextField 
        sx={{width: width}}
          label={<Typography fontFamily={"Silkscreen"} fontSize={20} marginTop={-0.5}>Search exercises...</Typography>}
          onChange={getSearchValue} />
    </Box>
  )
}
