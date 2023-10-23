import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

interface ThemesProps {
    children: ReactNode;
}

// Augment the palette to include an theme color
declare module '@mui/material/styles' {
    interface Palette {
        theme: Palette['primary'];
    }

    interface PaletteOptions {
        theme?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include an theme option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        theme: true;
    }
}
const mainTheme : string = '#352F44';
const lightTheme : string = "#5C5470";

const theme: Theme = createTheme({
    palette: {
        theme: {
            main: mainTheme,
            light: lightTheme,
            dark: '#A29415',
        },
    },
    typography: {
        allVariants: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    backgroundColor:lightTheme,
                    '&:hover': {
                        backgroundColor: mainTheme
                    },
                    color:'white'
                }),
            },
        },
    },
});

export function Themes({ children }: ThemesProps) {
    return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
}