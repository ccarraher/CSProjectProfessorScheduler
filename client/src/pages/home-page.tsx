import { useContext } from "react"
import { AuthContext } from "../hooks/use-auth"
import { Box, Button, Paper, Toolbar, Typography } from "@mui/material"

export const HomePage = () => {
    const {logout} = useContext(AuthContext)

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Toolbar />
            <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, p:3, overflow: 'hidden'}}>
                <Paper sx={{display: 'flex', height: '100%', p:4}}>
                    <Typography>Hello World</Typography>
                </Paper>
            </Box>
        </Box>
    )
}