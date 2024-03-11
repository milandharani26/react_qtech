import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';


export const color = green[500];

export const theme = createTheme({
    palette: {
        primary: {
            main: '#047857',
        },
        secondary: {
            main: '#f44336',
        },
    },
});