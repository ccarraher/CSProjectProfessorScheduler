import { ThemeOptions, createTheme } from "@mui/material";

export const themeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#3D82FF',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
    typography: {
      fontSize: 14,
      fontFamily: ['Poppins', 'Roboto'].join(',')
    }
  };

export const theme = createTheme(themeOptions)