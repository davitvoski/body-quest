import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";


type FilterList = {
    filterName: string,
    filterList: string[],
    listDataByOption: Function,
    keyExerercise: string
    // setExercise:Function
}
/**
 * Dynamic list all options that user can choose by traget, equipement or body part 
 * @param props FilterList
 * @returns FilterList
 */
export const FilterList = (props: FilterList) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0, whiteSpace: "nowrap" }}>
                        {props.filterName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup name="radio-buttons-group" className="targetOptions">
                        {props.filterList.map((filter, i) => (
                            <FormControlLabel
                                value={filter}
                                control={<Radio />}
                                label={filter}
                                key={i}
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => {
                                    props.listDataByOption(props.keyExerercise, filter);
                                }}
                            />
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

