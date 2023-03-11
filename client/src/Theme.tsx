import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    contrastThreshold: 4.5,
    ...(mode === 'light' ? {
      primary: {
        main: '#DD3F40',
        contrastText: '#1D181E'
      },
      secondary: {
        main: '#6D0305',
        contrastText: '#251F29'
      },
      background: {
        default: '#FFFBFF',
        paper: '#EEE8E8',
      },
    } : {
      primary: {
        main: '#FEB6BA',
        contrastText: '#FFFBFF'
      },
      secondary: {
        main: '#DD3F40',
        contrastText: '#EEE8E8'
      },
      background: {
        default: '#1D181E',
        paper: '#251F29',
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});

export default getDesignTokens