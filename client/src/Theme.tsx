import { PaletteMode } from "@mui/material";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: '#6D0305',
          divider: '#DD3F40',
          background: {
            default: '#FFFBFF',
            secondary: '#EEE8E8'
          },
          text: {
            primary: '#000',
            secondary: '#000',
          },
        }
      : {
          // palette values for dark mode
          primary: '#FEB6BA',
          divider: '#6D0305',
          background: {
            default: '#1D181E',
            secondary: '#251F29'
          },
          text: {
            primary: '#fff',
            secondary: '#fff',
          },
        }),
  },
});

export default getDesignTokens