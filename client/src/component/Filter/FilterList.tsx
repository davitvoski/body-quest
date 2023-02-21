import { Filter } from "./Filter"
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


type FilterList = {
    filterName: string,
    filterList: string[]
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
                <AccordionDetails className="targetOptions">
                    {props.filterList.map((filter, i) => (
                        <Filter option={filter} key={i} />
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

