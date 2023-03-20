import { IconButton, Theme, useMediaQuery } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTranslation } from "react-i18next";
export const ThemeNav = (props: {Theme: Theme, changeTheme: (current: string) => void}) => {
    const { t } = useTranslation();
    return(
        <IconButton 
            sx={{ l: 0.5 }} 
            color="inherit"
            title={t("changetheme") as string | undefined}
            onClick={() => props.changeTheme(props.Theme.palette.mode)}
        >
            {props.Theme.palette.mode === 'light' ? <Brightness7Icon htmlColor="white" /> : <Brightness4Icon htmlColor="white" />}
        </IconButton>
    )
}