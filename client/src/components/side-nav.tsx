import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import { HEADER_HEIGHT } from "./header";
import * as React from 'react'
import { Icon } from "./icon";
import { Link } from "react-router-dom";
export const SideNav = () => {
    const [selected, setSelected] = React.useState<number>(0);

    const handleListItemClick = (index: number, path?: string) => {
        setSelected(index);
        // Additional logic can be added here if needed for navigation
    };

    return (
        <Drawer variant="permanent" anchor="left" sx={{
            width: '240px', 
            flexShrink: 0, 
            marginTop: `calc(100vh - ${HEADER_HEIGHT}px)`, 
            [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },
        }}>
            <Toolbar />
            <List>
                {sideNavChoices.map((choice, idx) => {
                    const isSelected = selected === idx;
                    return (
                        <ListItem disablePadding key={choice.text}>
                            <Link to={choice.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemButton 
                                    selected={isSelected} 
                                    onClick={() => handleListItemClick(idx)}
                                >
                                    <ListItemIcon>
                                        <Icon name={choice.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary={choice.text} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
};

const sideNavChoices = [
    {
        text: 'Home',
        icon: 'Home',
        path: './home', 
    },
    {
        text: 'Availability',
        icon: 'Schedule', 
        path: './availability', 
    },
    {
        text: 'Preferences',
        icon: 'Schedule', 
        path: './preference', 
    },
    
    // ... other choices
];