import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Palette {
    logo: Palette['primary'];
  }

  interface PaletteOptions {
    logo: PaletteOptions['primary'];
  }
}

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
        banner: '#6D0305',
        cards: '#FFFBFF'
      },
      logo: {
        light: '#616161',
        main: '#404040',
        dark: '#000000',
      }
    } : {
      primary: {
        main: '#DD3F40',
        contrastText: '#EEE8E8'
      },
      secondary: {
        main: '#FEB6BA',
        contrastText: '#FFFBFF'
      },
      background: {
        default: '#1D181E',
        paper: '#251F29',
        banner: '#38333c',
        cards: '#251F29'
      },
      logo: {
        light: '#ffffff',
        main: '#e0e0e0',
        dark: '#bababa',
      }
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