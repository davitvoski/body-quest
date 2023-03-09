import * as React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import i18n from "./i18next";

interface ILanguage {
    [x: string]: { [x: string]: string },
}

/**
 * Show all available languages 
 * @returns LanguageNav options
 */
export const LanguageNav = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  
    const lngs: ILanguage = {
        en: { nativeName: 'English' },
        fr: { nativeName: 'Français' },
        ch: { nativeName: '简体中文' }
    };

    return (
        <>
            {/*  language button */}
            <IconButton
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                title="Select Language"
            >
                <LanguageIcon sx={{ l: 0.5 }} color="inherit" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}

                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                {Object.keys(lngs).map((lng) => (
                    <MenuItem key={lng} onClick={() => i18n.changeLanguage(lng)}>
                        <Typography>{lngs[lng].nativeName}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}