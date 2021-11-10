import React from 'react'
import {Box, Grid, Card, CardContent, Stack} from '@mui/material'

import HierarchyList from './hierarchy/HierarchyList'

/* **************** NEED: Responsive web?(for smaller screens, now it's only normal in full screen) **************** */
export default class Content extends React.Component {
    render() {
        return (
            <Box sx={{ flexGrow: 1 }} pt={5} pb={5} pl={2}>
                <Grid container spacing={5}>

                    {/* Section 1: Sidebar */}
                    <Grid item md={3}>
                        <HierarchyList
                            idPath={this.props.idPath}
                            hierarchy={this.props.hierarchy}
                            IDs={this.props.IDs}
                            dataCallback={this.props.dataCallback}
                        />
                    </Grid>

                    {/* Section 2: Information Area */}
                    <Grid item md={7}>
                        <Stack spacing={2}>

                            {/* Section 2.1: Terms Info */}
                            <Grid container justifyContent="center" bgcolor={'#f5f5f5'} borderRadius='5px' sx={{boxShadow: 3}}>
                                <h2>{this.props.content.term}</h2>
                            </Grid>

                            {/* Section 2.2: Definition Info */}
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h2>&ensp;Definition</h2>
                                    <p>{this.props.content.def}</p>
                                </CardContent>
                            </Card>
                            
                            {/* Section 2.3: Synonym Info */}
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h2>&ensp;Synonyms</h2>
                                    <ul>
                                        { this.props.content.syn.map(syn => (<li style={{lineHeight: 2}} key={syn}>{syn}</li>)) }
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Section 2.4: Acronym Info */}
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h2>&ensp;Acronyms</h2>
                                    <ul>
                                        { this.props.content.acr.map(acr => (<li style={{lineHeight: 2}} key={acr}>{acr}</li>)) }
                                    </ul>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}