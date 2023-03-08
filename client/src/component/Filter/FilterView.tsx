import React, { useEffect } from 'react';
import { useState } from "react";
import { Button, Drawer, TextField } from '@mui/material';
import { FilterDrawer } from './FilterDrawer';
import { IExercise } from '../../../../shared';
import { useTranslation} from "react-i18next";

type FilterViewProps = {
    allExercises: IExercise[],
    setExercise:Function
}

/**
 * When click filter button will open drawer
 * @param props FilterViewProps
 * @returns FilterView 
 */
export const FilterView = (props: FilterViewProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const {t} = useTranslation();
    return (
        <div>
            <Button onClick={() => { setIsFormOpen(true) }}>
                <p>{t('filter')}</p>
            </Button>

            <FilterDrawer
                allExercises={props.allExercises}
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)} 
                setExercise={props.setExercise} />
        </div>
    )
}   