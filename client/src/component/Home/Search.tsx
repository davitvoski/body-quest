import { Box } from "@mui/system"
import { styled, alpha } from '@mui/material/styles';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { TextField } from "@mui/material";
import { IExercise } from "../Exercise/IExercises";

type searchProps = {
    setExercise: Function
    allExercises: IExercise[]
}
export const Search = (props: searchProps) => {
    const getSearchValue = (event: any) => {
        event.preventDefault();
        const searchExercise = event.target.value;
        let isBlank = /^\s*$/;
        
        if (searchExercise.length == 0 || searchExercise.match(isBlank)) {
            props.setExercise(props.allExercises);
        } else {
            const exercises = props.allExercises.filter(exercise => exercise.name.includes(searchExercise) || exercise.body_part.includes(searchExercise)
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
                    placeholder="Search…"
                    onChange={getSearchValue}
                />
            </form>
        </div >
    )
}
