import React from 'react'
import {Box, Grid, Card, CardContent, Stack} from '@mui/material'

export default class Home extends React.Component{
    render() {
        return (
            <Box sx={{ flexGrow: 1 }} p={2}>
                <Grid container spacing={2}>
                    <Grid item md={2}></Grid>
                    <Grid item md={8}>
                        <Stack spacing={2}>
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h1>How To Use The Dictionary</h1>
                                    <p style={{lineHeight: 2}}>Select a term from the top bar and sub-terms from the side panel that will appear, or search for any key terms.</p>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Grid>
            </Box>
        )
    }
}