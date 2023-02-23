import { Filter } from "./Filter"
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
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {props.filterName}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        className="targetOptions"
                    >
                        {props.filterList.map((filter, i) => (
                            <FormControlLabel onClick={() => {
                                props.listDataByOption(props.keyExerercise, filter);
                            }}
                                value={filter}
                                control={<Radio />}
                                label={filter} />
                        ))}
                    </RadioGroup>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

