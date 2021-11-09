import React from 'react'
import {Card, CardContent} from '@mui/material'

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

export default function HierarchyList(props){
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const handleClick1 = () => {
      setOpen1(!open1);
    }
    const handleClick2 = () => {
        setOpen2(!open2);
    }
    const handleClick3 = () => {
        setOpen3(!open3);
    }
    const handleClick4 = () => {
        setOpen4(!open4);
    }


    return(
        <Card sx={{bgcolor: '#f5f5f5'}}>
            <CardContent>
                <List
                    sx={{ bgcolor: '#f5f5f5'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader sx={{bgcolor: '#f5f5f5'}} component="div" id="nested-list-subheader">
                        EPRI Navigation
                    </ListSubheader>
                    }>
                    
                    {/* Level 1 */}
                    <Divider />
                    <ListItemButton onClick={handleClick1}>
                        <ListItemText primary={<b>Level 1</b>} />
                        {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    {/* Sublevels of Level 1 */}
                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 1" />
                            </ListItemButton>

                            <Divider />
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 2" />
                            </ListItemButton>
                        </List>
                    </Collapse>


                    {/* Level 2 */}
                    <Divider />
                    <ListItemButton onClick={handleClick2}>
                        <ListItemText primary={<b>Level 2</b>} />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    {/* Sublevels of Level 2 */}
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 1" />
                            </ListItemButton>

                            <Divider />
                            <ListItemButton onClick={handleClick4} sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 2" />
                                {open4 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            {/* Sublevels of sublevel 2 */}
                            <Collapse in={open4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 8 }}>
                                        <ListItemText primary="Allocation Analysis" />
                                    </ListItemButton>

                                    <ListItemButton sx={{ pl: 8 }}>
                                        <ListItemText primary="Term 2" />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <Divider />
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 3" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    {/* Level 3 */}
                    <Divider />
                    <ListItemButton onClick={handleClick3}>
                        <ListItemText primary={<b>Level 3</b>} />
                        {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    {/* Sublevels of Level 3 */}
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Divider />
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 1" />
                            </ListItemButton>

                            <Divider />
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 2" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Divider />
                </List>
            </CardContent>
        </Card>
    )
}