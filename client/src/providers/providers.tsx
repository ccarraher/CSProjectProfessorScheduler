import { ThemeProvider } from '@mui/material'
import { theme } from '../theme/theme';
import * as React from 'react'
import { AuthProvider } from '../hooks/use-auth';

export const Providers = ({children}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    )
}