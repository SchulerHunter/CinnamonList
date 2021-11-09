import React from 'react'
import Navbar from './Navbar'
import {Box, Grid, Card, CardContent, Stack} from '@mui/material'

export default function Home(){
    return(
        <div>
            <Navbar />
            <Box sx={{ flexGrow: 1 }} p={2}>
                <Grid container spacing={2}>
                    <Grid item md={2}></Grid>
                    <Grid item md={8}>
                        <Stack spacing={2}>
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h1>How To Use The Dictionary</h1>
                                    <p style={{lineHeight: 2}}>Click header tab, click sub levels. Or search</p>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item md={2}></Grid>
                </Grid>
            </Box>
        </div>
    )
}