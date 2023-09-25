import {Box } from "@mui/material"
import { Header } from "./header"
import * as React from "react"
import { SideNav } from "./side-nav"

export const BaseLayout = ({ children }: BaseLayoutProps) => {
    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Header />
            <SideNav />
            {children}
        </Box>
    )
}

interface BaseLayoutProps {
    readonly children: React.ReactNode
}