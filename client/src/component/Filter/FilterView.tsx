import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Drawer, TextField } from '@mui/material';
import { FilterDrawer } from './FilterDrawer';
import { IExercise } from '../../../../shared';

type FilterViewProps = {
    allExercises: IExercise[],
    setExercise:Function
}

export const FilterView = (props: FilterViewProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
 
    return (
        <div>
            <Button onClick={() => { setIsFormOpen(true) }}>
                <p>Filter</p>
            </Button>

            <FilterDrawer
                allExercises={props.allExercises}
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)} 
                setExercise={props.setExercise} />
        </div>
    )
}   