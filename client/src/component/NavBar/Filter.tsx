import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export const Filter = () => {
    const [type, setType] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Age</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={type}
                    label="Any"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem>Any</MenuItem>
                    <MenuItem>Name</MenuItem>
                    <MenuItem>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}