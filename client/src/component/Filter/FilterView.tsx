import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Drawer, TextField } from '@mui/material';
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

            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="filter-options-label">Any</InputLabel>
                <Select
                    labelId="filter-options-label"
                    id="filter-options"
                    value={type}
                    label= "type"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Target">Target</MenuItem>
                    <MenuItem value="Favorite">Favorite</MenuItem>
                    <MenuItem value="Equipment">Equipment</MenuItem>
                    <MenuItem value="Body Part">Body Part</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}   