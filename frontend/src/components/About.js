import React from 'react'
import Navbar from './Navbar'
import {Box, Grid, Card, CardContent, Stack} from '@mui/material'

export default function About(){
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
                                    <h1>About ERPI</h1>
                                    <p style={{lineHeight: 2}}>The Electric Power Research Institute (EPRI) conducts research, development, 
                                    and demonstration projects for the benefit of the public in the United States and internationally. 
                                    As an independent, nonprofit organization for public interest energy and environmental research, 
                                    we focus on electricity generation, delivery, and use in collaboration with the electricity sector, 
                                    its stakeholders and others to enhance the quality of life by making electric power safe, reliable, 
                                    affordable, and environmentally responsible. </p>
                                </CardContent>
                            </Card>

                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h1>About the ERPI Dictionary</h1>
                                    <p style={{lineHeight: 2}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                                    mollit anim id est laborum.</p>
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