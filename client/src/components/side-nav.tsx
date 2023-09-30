import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import { HEADER_HEIGHT } from "./header";
import * as React from 'react'
import { Icon } from "./icon";

export const SideNav = () => {
    const [selected, setSelected] = React.useState<number>(0)
    return (
        <Drawer variant="permanent" anchor="left" sx={{width: '240px', flexShrink: 0, marginTop: `calc(100vh - ${HEADER_HEIGHT}px)`, [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box' },}}>
            <Toolbar />
            <List>
            {sideNavChoices.map((x, idx) => {
                const isSelected = selected === idx
                return (
                    <ListItem disablePadding onClick={() => setSelected(idx)}>
                        <ListItemButton selected={isSelected}>
                            <ListItemIcon>
                                <Icon name={x.icon} />
                            </ListItemIcon>
                            <ListItemText primary={x.text} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
            </List>
        </Drawer>
    )
}

const sideNavChoices = [
    {
        text: 'Home',
        icon: 'Home',
    },
    {
        text: 'Schedule',
        icon: 'Schedule',
    },

]