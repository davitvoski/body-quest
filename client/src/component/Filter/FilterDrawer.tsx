import { useEffect, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FilterList } from './FilterList';
import { FavoriteBorder } from '@mui/icons-material';
import { IExercise } from '../../../../shared';
import { Exercise } from '../Exercise/Exercise';
import StarBorder from '@mui/icons-material/StarBorder';
import { useTranslation } from "react-i18next";

type FilterDrawer = {
    allExercises: IExercise[],
    setExercise: Function
    open: boolean,
    onClose: () => void
}
/**
 * Drawer, list all options that can be filtered
 * Dynamic generated options by allExercises
 * @param props FilterDrawer
 * @returns FilterDrawer
 */
export const FilterDrawer = (props: FilterDrawer) => {
    const [favouriteExercises, setFavouriteExercises] = useState<IExercise[]>([]);
    const [showFavorite, setShowFavorite] = useState(false);

    const [targetList, setTargetList] = useState<string[]>([]);
    const [equipments, setEquipements] = useState<string[]>([]);
    const [bodyPart, setBodyPart] = useState<string[]>([]);
    const { t } = useTranslation();

    /**
     * Dynamic generated options by allExercises
     */
    function getOptions() {
        let tempTarget: string[] = [];
        let tempEquipment: string[] = [];
        let body_part: string[] = [];
        props.allExercises.forEach((element: any) => {
            tempTarget.push(element.target);
            tempEquipment.push(element.equipment);
            body_part.push(element.body_part);
        });

        setTargetList(Array.from(new Set(tempTarget)));
        setEquipements(Array.from(new Set(tempEquipment)));
        setBodyPart(Array.from(new Set(body_part)));
    }

    /**
     * list all exercises based on the values choosed by the user
     * @param keyName object key of exercise, such as target, equipment, body_part
     * @param optionName radio option user choose
     */
    const listDataByOption = (keyName: keyof IExercise, optionName: string) => {
        let optionEXercises: IExercise[] = props.allExercises.filter(exercise => exercise[keyName] === optionName);
        // console.log("??"+optionEXercises);
        props.setExercise(optionEXercises)
        props.onClose();
    }

    useEffect(() => {
        getOptions();
    }, [props.allExercises]);

    
    // if user login, can filter their favorite exercises
    useEffect(() => {
        /**
         * This function gets a users favourite exercises
         */
        async function getFavourties() {
            const resp = await fetch(`/api/exercises/favourites`);
            // If not logged in, return
            if (resp.status === 200) {
                const data = (await resp.json()).exercises as IExercise[];
                setFavouriteExercises(data);
                setShowFavorite(true);
            }
        }

        // NOTE: IF THE FAVOURITES ARE NOT DISPLAYING
        // IT MOST POSSIBLY MEANS THAT THE USER DOEST NOT HAVE ANY FAVOURITES
        getFavourties().catch((err) => {
            console.log(err);
        });
    }, [favouriteExercises]);



    return (
        <div id='filterDrawer'>
            <Drawer anchor='right' PaperProps={{ sx: { width: 300 } }} open={props.open} onClose={props.onClose} >
                <FilterList listDataByOption={listDataByOption} filterName={t('target')} filterList={targetList} keyExerercise="target" />
                <FilterList listDataByOption={listDataByOption} filterName={t('equipement')} filterList={equipments} keyExerercise="equipment" />
                <FilterList listDataByOption={listDataByOption} filterName={t('body_part')} filterList={bodyPart} keyExerercise="body_part" />
                {showFavorite && <List component="div" disablePadding>
                    <ListItemButton onClick={() => {
                        props.setExercise(favouriteExercises);
                        props.onClose()
                    }} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={t('Favorites')} />
                    </ListItemButton>
                </List>}
            </Drawer>
        </div >
    )
}