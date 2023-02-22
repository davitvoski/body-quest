import { useEffect, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FilterList } from './FilterList';
import { FavoriteBorder } from '@mui/icons-material';

type FilterDrawer = {
    allExercises: any,
    open: boolean,
    onClose: any
}

export const FilterDrawer = (props: FilterDrawer) => {
    const [targetList, setTargetList] = useState<string[]>([]);
    const [equipments, setEquipements] = useState<string[]>([]);
    const [bodyPart, setBodyPart] = useState<string[]>([]);

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

    useEffect(() => {
        getOptions();
    }, [props.allExercises]);

    return ( 
        <div id='filterDrawer'>
            <Drawer  anchor='right' PaperProps={{ sx: { width: 300 } }} open={props.open} onClose={props.onClose} >
                <p>Filter options</p>
                <FilterList filterName="Target" filterList={targetList} />
                <FilterList filterName="Equipement" filterList={equipments} />
                <FilterList filterName=" Body Part" filterList={bodyPart} />
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <FavoriteBorder />
                        </ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItemButton>
                </List>
            </Drawer>
        </div >
    )
}