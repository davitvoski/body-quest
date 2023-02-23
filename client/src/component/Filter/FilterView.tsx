import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Drawer, TextField } from '@mui/material';
import { FilterDrawer } from './FilterDrawer';
import { IExercise } from '../Exercise/IExercises';
import { FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';


type FilterViewProps = {
    allExercises: IExercise[],
    setExercise:Function
}

export const FilterView = (props: FilterViewProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [type, setType] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        console.log(type);

    };

    return (
        <div>
            <Button onClick={() => { setIsFormOpen(true) }}>
                <p>Filter</p>
            </Button>

            <FilterDrawer
                allExercises={props.allExercises}
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)} />

        </div>
    )
}   