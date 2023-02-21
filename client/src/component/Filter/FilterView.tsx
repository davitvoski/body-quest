import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Drawer, TextField } from '@mui/material';
import { FilterDrawer } from './FilterDrawer';

type FilterViewProps = {
    allExercises: any
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
                onClose={() => setIsFormOpen(false)} />

        </div>
    )
}   