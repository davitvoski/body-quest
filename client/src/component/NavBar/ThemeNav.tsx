import { IconButton, Theme, useMediaQuery } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeNav = (props: {Theme: Theme, changeTheme: (current: string) => void}) => {
    return(
        <IconButton 
            sx={{ l: 0.5 }} 
            color="inherit"
            title="Change Theme"
            onClick={() => props.changeTheme(props.Theme.palette.mode)}
        >
            {props.Theme.palette.mode === 'light' ? <Brightness7Icon htmlColor="white" /> : <Brightness4Icon htmlColor="white" />}
        </IconButton>
    )
}