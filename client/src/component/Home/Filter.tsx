import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export const Filter = () => {
    const [type, setType] = React.useState('Any');
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        console.log(type);

    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="filter-options">Any</InputLabel>
                <Select
                    labelId="filter-options"
                    id="filter-options"
                    value={type}
                    label="Any"
                    onChange={handleChange}
                >
                    <MenuItem value="Any">Any</MenuItem>
                    <MenuItem value="Target">Target</MenuItem>
                    <MenuItem value="Favorite">Favorite</MenuItem>
                    <MenuItem value="Equipment">Equipment</MenuItem>
                    <MenuItem value="Body Part">Body Part</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}