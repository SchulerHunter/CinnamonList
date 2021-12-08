import React from 'react'
import {Card, CardContent, List, ListSubheader} from '@mui/material'

import ListItem from './ListItem'

export default class HierarchyList extends React.Component {
    render() {
        return(
            <Card sx={{bgcolor: '#f5f5f5'}}>
            <CardContent>
                <List
                    sx={{ bgcolor: '#f5f5f5', overflow: 'auto', maxHeight: '30rem'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                    <ListSubheader sx={{bgcolor: '#f5f5f5'}} component="div" id="nested-list-subheader">
                        Cinnamon List Navigation
                    </ListSubheader>
                    }>

                    { Object.keys(this.props.hierarchy).length > 0 &&
                        Object.keys(this.props.hierarchy).map(id => (
                            <ListItem
                                key={id}
                                id={id}
                                pl={0}
                                idPath={this.props.idPath}
                                IDs={this.props.IDs}
                                hierarchy={this.props.hierarchy[id]}
                                dataCallback={this.props.dataCallback}
                            />
                        ))
                    }
                </List>
            </CardContent>
        </Card>
        )
    }
}