import { IconButton, useMediaQuery } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeNav = () => {
    return(
        <IconButton 
            sx={{ l: 0.5 }} 
            color="inherit"
            title="Select Theme"
        >
            {useMediaQuery('(prefers-color-scheme: dark)') === false ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    )
}