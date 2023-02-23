import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { type } from 'os';
import { useState } from 'react';

type filterProps ={
    
}

export const Filter = (props:filterProps) => {
    const [type, setType] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        console.log(type);

    };

    return (
        <div> 
            <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="filter-options-label">Any</InputLabel>
                <Select
                    labelId="filter-options-label"
                    id="filter-options"
                    value={type}
                    label= "type"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Target">Target</MenuItem>
                    <MenuItem value="Favorite">Favorite</MenuItem>
                    <MenuItem value="Equipment">Equipment</MenuItem>
                    <MenuItem value="Body Part">Body Part</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}