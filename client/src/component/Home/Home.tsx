import Toolbar from '@mui/material/Toolbar';
import { Search } from './Search';
import { useState, useEffect } from 'react';
import { ExerciseList } from '../Exercise/ExerciseList';
import { FilterView } from '../Filter/FilterView';
import { IExercise } from '../../../../shared';
import { useTranslation} from "react-i18next";
import {exercisesData} from '../../Data/testData'
export const Home = () => {
    const { t } = useTranslation();
    const [allExercises, setAllExercise] = useState<IExercise[]>([]);
    const [exercises, setExercise] = useState<IExercise[]>(allExercises);
    async function fetchExercises() {
        const response = await fetch('/api/exercises', {
            method: 'GET',
        }); 

        if (response.status === 404) {
            throw new Error(`Failed to fetch ${response.status}: ${response.statusText}`)
        }

        const jsonData = await response.json() as IExercise[];
        console.log(jsonData)
        setAllExercise(jsonData);
        setExercise(jsonData);
    }
    
    useEffect(() => {
        //fetchExercises();
        // test data, will delete after
        setAllExercise(exercisesData);
        setExercise(exercisesData);
    }, [])

    return (
        <div className='homePage'>
            <div className='outer'>
                <div className='slogan'>
                    <p id='make_your'>MAKE YOUR</p>
                    <h1>BODY SHAPE</h1>
                    <p id='pSlogan'>Push yourself harder to become better </p>
                </div>
                <div className='inner'>
                    <img  id='fitness' src='src/Data/fitness.png'/>
                </div>
            </div>
            <h2>{t('workout')}</h2>
            <Toolbar className='searchBar'>
                <Search allExercises={allExercises} setExercise={setExercise} />
                <FilterView allExercises={allExercises} setExercise={setExercise} />
            </Toolbar>
            <div className='exercisesBox'>
                <ExerciseList exercises={exercises} />
            </div>
        </div>
    )
}