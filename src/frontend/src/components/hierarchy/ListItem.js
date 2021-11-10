import React from 'react'
import {Collapse, Divider, List, ListItemButton, ListItemText} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'

export default class ListItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    clickHandler = () => {
        const expanded = !this.state.expanded
        this.setState({expanded: expanded})
        this.props.dataCallback(this.props.id)
    }

    render() {
        return(
        <div>
            <Divider />
            <ListItemButton sx={{ pl: this.props.pl }} onClick={this.clickHandler}>
                <ListItemText primary={this.props.IDs[this.props.id].term} />
                { Object.keys(this.props.hierarchy).length > 0 && 
                    <div>
                        { this.state.expanded ? <ExpandLess /> : <ExpandMore /> }
                    </div>
                }
            </ListItemButton>

            { Object.keys(this.props.hierarchy).length > 0 && 
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        { Object.keys(this.props.hierarchy).map(id => (
                            <ListItem 
                                key={id}
                                id={id}
                                pl={this.props.pl+2}
                                IDs={this.props.IDs}
                                hierarchy={this.props.hierarchy[id]}
                                dataCallback={this.props.dataCallback}
                            />
                        ))}
                    </List>
                </Collapse>
            }
        </div>
        )
    }
}