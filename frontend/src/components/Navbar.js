import {Grid, Box, Button, CardMedia, TextField} from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'
import imagePath from './static/EPRI_logo_2021_RGB.png'

function Navbar(){
    return(
        // Navigation bar setting
        <div>
            <Box container sx={{ position: 'sticky', zIndex: 100, bgcolor: '#f5f5f5', boxShadow: 3, top: 0}} pt={'.5rem'} pb={'.5rem'}
                display={'flex'} 
                flexDirection={'row'} 
                alignItems="center" 
                justifyContent="space-between">

                    {/* Left part: logo and links */}
                    <Grid display={'flex'} 
                        flexDirection={'row'} 
                        alignItems="center" 
                        justifyContent="space-start"
                        ml={'3rem'}>

                        {/* EPRI logo img setting */}
                        <Grid mr={'2rem'}>
                            <a href="https://www.epri.com" target="_blank" rel="noreferrer">
                                <CardMedia
                                    component="img"
                                    sx={{ maxWidth: 150 }}
                                    image={imagePath}
                                    alt="EPRI LOGO"
                                />
                            </a>
                        </Grid>

                        {/* Home button setting */}
                        <Grid mr={'1rem'}>
                            <Link to="/" style={{textDecoration: 'none'}}><Button><b>Home</b></Button></Link>
                        </Grid>

                        {/* Add Terms button setting */}
                        <Grid mr={'1rem'}>
                            <Link to="/add" style={{textDecoration: 'none'}}><Button><b>Add Terms</b></Button></Link>
                        </Grid>

                        {/* About button setting */}
                        <Grid>
                            <Link to="/about" style={{textDecoration: 'none'}}><Button><b>About</b></Button></Link>
                        </Grid>

                    </Grid>

                    {/* Right part: Search bar setting */}
                    <Grid mr={'3rem'} >
                        <TextField style={{ width: '12rem'}} id="outlined-basic" label={"Search"} variant="outlined" />
                    </Grid>
            </Box>
            <Box container sx={{ position: 'sticky', zIndex: 100, bgcolor: '#f5f5f5', boxShadow: 3, top: 0}} pt={'.5rem'} pb={'.5rem'}
                display={'flex'} 
                flexDirection={'row'} 
                alignItems="center" 
                justifyContent="space-between">
                    <Grid display={'flex'} 
                        flexDirection={'row'} 
                        alignItems="center" 
                        justifyContent="space-start"
                        ml={'3rem'}>
                        <Grid mr={'1rem'}>
                            <Link to="/" style={{textDecoration: 'none'}}><Button><b>Coal</b></Button></Link>
                        </Grid>
                        <Grid mr={'1rem'}>
                            <Link to="/" style={{textDecoration: 'none'}}><Button><b>Hydro</b></Button></Link>
                        </Grid>
                        <Grid mr={'1rem'}>
                            <Link to="/" style={{textDecoration: 'none'}}><Button><b>Maintenance</b></Button></Link>
                        </Grid>
                    </Grid>
            </Box>
        </div>
    )
}
export default Navbar