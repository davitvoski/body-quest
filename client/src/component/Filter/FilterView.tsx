import React, { useEffect } from 'react';
import { useState } from "react";
import { Box, Button, Drawer, TextField, Typography } from '@mui/material';
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
        <div className="filterBtn">
            <Box
                alignSelf="center"
                position={"fixed"}
                bottom={20}
                right={20}
                width={"20%"}
                zIndex={3}
                >
                <Button 
                    variant="contained" 
                    fullWidth
                    color="primary"
                    onClick={() => { setIsFormOpen(true) }}>
                    <Typography color="background.paper" fontFamily={"Silkscreen"} variant="button" fontSize={30}>{t('filter')}</Typography>
                </Button>
            </Box>

            <FilterDrawer
                allExercises={props.allExercises}
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)} 
                setExercise={props.setExercise} />
        </div>
    )
}   