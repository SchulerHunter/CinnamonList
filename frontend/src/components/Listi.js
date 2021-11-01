import React from 'react'
import {Grid, Card, CardContent, TextField, Stack} from '@mui/material'
import {useState, useEffect} from 'react'

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Listi(props){
    // **************** David's sidebar is commented ****************
    // const [cur, setCur] = useState(props.data['start'])
    // const [title, setTitle] = useState("start")
    // let goback = () => {
    //     if(props.data[title]['parent'] == undefined){
    //         console.log("we could not go back")
    //     }else{
    //         setTitle(props.data[title]['parent'])
    //         setCur(props.data[props.data[title]['parent']])
    //     }
    // }

    {/* **************** NEED: Expand each level individually **************** */}
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(!open);
    }

    return(
        // <Card>
        //     <CardContent>
        //         <TextField fullWidth id="outlined-basic" label="Search" variant="outlined" />
        //         <button onClick={goback}><h3>&lt; {title}</h3></button>
        //         <Stack>
        //             {cur["children"].map(child => (<Bar title={child} setTitle={setTitle} setCur={setCur} setCurrent={props.setCurrent} data={props.data}/>))}
        //         </Stack>
        //     </CardContent>
        // </Card>

        <Card>
            <CardContent>
                <List
                    sx={{ bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        EPRI Navigation
                    </ListSubheader>
                    }>
                    
                    {/* **************** NEED: Read data from database(func param)instead of typing here **************** */}
                    {/* Level 1 */}
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Level 1" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {/* Sublevels of Level 1 */}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Allocation Analysis" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 2" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    {/* Level 2 */}
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Level 2" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {/* Sublevels of Level 2 */}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 1" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 2" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 3" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    {/* Level 3 */}
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Level 3" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {/* Sublevels of Level 3 */}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 1" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Sublevel 2" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </CardContent>
        </Card>
    )
}

// function Bar(props){
//     let check = () => {
//         console.log("check works")
//         if (props.data[props.title]["children"] == undefined){
//             console.log("change data displayed")
//             props.setCurrent(props.data[props.title]['data'])
//         }else{
//             console.log(props.data[props.title])
//             props.setTitle(props.title)
//             props.setCur(props.data[props.title])
//         }
//     }
//     return(
//         <div onClick={check}>{props.title} {props.data[props.title]['children'] == undefined ? "" : '>'}</div>
//     )
// }