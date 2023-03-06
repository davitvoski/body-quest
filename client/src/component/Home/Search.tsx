import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useTranslation} from "react-i18next";

type searchProps = {
    setExercise: Function
    allExercises: IExercise[]
}
export const Search = (props: searchProps) => {
    const { t } = useTranslation();
    const getSearchValue = (event: any) => {
        event.preventDefault();
        const searchExercise = event.target.value;
        let isBlank = /^\s*$/;

        if (searchExercise.length == 0 || searchExercise.match(isBlank)) {
            props.setExercise(props.allExercises);
        } else {
            const exercises = props.allExercises.filter(exercise => exercise.name.includes(searchExercise) 
                                                        || exercise.body_part.includes(searchExercise)
            )
            if (exercises != undefined) {
                props.setExercise(exercises);
            }
            console.log(exercises);
        }
    }

    return (
        <div id="searchBox">
            <form id="searchForm" onSubmit={e => { e.preventDefault(); }}>
                <SearchIcon />
                <TextField
                    id="searchInput"
                    //placeholder={t('search')}
                    onChange={getSearchValue}
                />
            </form>
        </div >
    )
}
