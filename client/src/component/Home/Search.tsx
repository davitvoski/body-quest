import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useTranslation } from "react-i18next";

type searchProps = {
  setExercise: Function;
  allExercises: IExercise[];
};

/**
 * This feature allow user to serach exercises they want
 * @param props searchProps
 * @returns search bar
 */
export const Search = (props: searchProps) => {
  const { t } = useTranslation();

  /**
   * Will list all exercises based on the values entered by the user.
   * @param event 
   */
  const getSearchValue = (event: any) => {
    event.preventDefault();
    const searchExercise = event.target.value;
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
    <div id="searchBox">
      <form id="searchForm" onSubmit={e => { e.preventDefault(); }}>
        <SearchIcon />
        <TextField
          id="searchInput"
          placeholder={t('search') as string | undefined}
          onChange={getSearchValue}
        />
      </form>
    </div >
  )
}
