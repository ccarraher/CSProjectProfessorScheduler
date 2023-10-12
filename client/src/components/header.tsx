import { Avatar, AppBar, Button, Typography, Box, Toolbar, useTheme, Menu, MenuItem } from "@mui/material"
import * as React from 'react'
import { AuthContext } from "../hooks/use-auth"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const HEADER_HEIGHT = 64

export const Header = () => {
    const theme = useTheme()
    const {user, logout} = React.useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout()
        handleClose()
    }

    const name = `${user?.firstName} ${user?.lastName}`
    return (
        <AppBar position="fixed" sx={{maxHeight: HEADER_HEIGHT, gap: 4, display: 'flex', flexDirection: 'row', zIndex: (theme) => theme.zIndex.drawer + 1}} color="default">
            <Toolbar sx={{justifyContent: 'space-between', width: '100%', display: 'flex', overflow: 'hidden'}}>
                <Box sx={{display: 'inline-flex', gap: theme.spacing(2.5), alignItems: 'center'}}>
                    <Box component="img" src="./utdallas-logo.png" width="50px" height='50px' />
                    <Typography variant="h4" color="grey">CS Scheduler</Typography>
                </Box>
                <Button sx={{display: 'flex', gap: theme.spacing(1)}} onClick={handleClick}>
                    <Avatar />
                    <Typography variant="body1" color="grey">{name}</Typography>
                    <KeyboardArrowDownIcon sx={{color: 'grey'}} />
                </Button>
            </Toolbar>
            <Menu open={open} anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                sx={{mt: 5}}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}