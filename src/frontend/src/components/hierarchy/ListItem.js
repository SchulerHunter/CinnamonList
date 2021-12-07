import React from 'react'
import {Collapse, Divider, List, ListItemButton, ListItemText} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'

export default class ListItem extends React.Component{
    clickHandler = () => {
        this.props.dataCallback(this.props.id)
    }

    render() {
        return(
        <>
            <Divider />
            <ListItemButton key={this.props.id} sx={{ pl: this.props.pl }} onClick={this.clickHandler}>
                <ListItemText primary={this.props.IDs[this.props.id].term} />
                { Object.keys(this.props.hierarchy).length > 0 && 
                    <>
                        { this.props.idPath.includes(this.props.id) ? <ExpandLess /> : <ExpandMore /> }
                    </>
                }
            </ListItemButton>

            { Object.keys(this.props.hierarchy).length > 0 && 
                <Collapse in={this.props.idPath.includes(this.props.id)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        { Object.keys(this.props.hierarchy).map(id => (
                            <ListItem 
                                id={id}
                                idPath={this.props.idPath}
                                pl={this.props.pl+2}
                                IDs={this.props.IDs}
                                hierarchy={this.props.hierarchy[id]}
                                dataCallback={this.props.dataCallback}
                            />
                        ))}
                    </List>
                </Collapse>
            }
        </>
        )
    }
}