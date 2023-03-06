import { useEffect, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FilterList } from './FilterList';
import { FavoriteBorder } from '@mui/icons-material';
import { IExercise } from '../../../../shared';
import { Exercise } from '../Exercise/Exercise';
import StarBorder from '@mui/icons-material/StarBorder';
import { useTranslation} from "react-i18next";

type FilterDrawer = {
    allExercises: IExercise[],
    setExercise: Function
    open: boolean,
    onClose: () => void
}

export const FilterDrawer = (props: FilterDrawer) => {
    const [targetList, setTargetList] = useState<string[]>([]);
    const [equipments, setEquipements] = useState<string[]>([]);
    const [bodyPart, setBodyPart] = useState<string[]>([]);
    const {t} = useTranslation();

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
        console.log(equipments);
    }

    const listDataByOption = (keyName: keyof IExercise, optionName: string) => {
        let optionEXercises:IExercise[] = props.allExercises.filter(exercise => exercise[keyName] === optionName);
        // console.log("??"+optionEXercises);
        props.setExercise(optionEXercises)
        props.onClose();
    }


    useEffect(() => {
        getOptions();
    }, [props.allExercises]);

    return (
        <div id='filterDrawer'>
            <Drawer anchor='right' PaperProps={{ sx: { width: 300 } }} open={props.open} onClose={props.onClose} >
                <p>Filter options</p>
                <FilterList listDataByOption={listDataByOption} filterName="Target" filterList={targetList} keyExerercise="target" />
                <FilterList listDataByOption={listDataByOption} filterName="Equipement" filterList={equipments} keyExerercise="equipment" />
                <FilterList listDataByOption={listDataByOption} filterName="Body Part" filterList={bodyPart} keyExerercise="body_part" />
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder htmlColor="#EFE2A2"/>
                        </ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItemButton>
                </List>
            </Drawer>
        </div >
    )
}