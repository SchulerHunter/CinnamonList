import React from 'react'
import {Card, CardContent, Divider, List, ListSubheader} from '@mui/material'

import ListItem from './ListItem'

export default class HierarchyList extends React.Component {
    render() {
        return(
            <Card sx={{bgcolor: '#f5f5f5'}}>
            <CardContent>
                <List
                    sx={{ bgcolor: '#f5f5f5'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader sx={{bgcolor: '#f5f5f5'}} component="div" id="nested-list-subheader">
                        Cinnamon List Navigation
                    </ListSubheader>
                    }>

                    {Object.keys(this.props.hierarchy).length > 0 &&
                        <div>
                            { Object.keys(this.props.hierarchy).map(id => (
                                <ListItem
                                    key={id}
                                    id={id}
                                    pl={0}
                                    IDs={this.props.IDs}
                                    hierarchy={this.props.hierarchy[id]}
                                    dataCallback={this.props.dataCallback}
                                />
                            ))}
                        </div>
                    }

                    <Divider />
                </List>
            </CardContent>
        </Card>
        )
    }
}