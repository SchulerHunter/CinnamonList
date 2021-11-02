import {Grid, Box, Button, CardMedia, TextField} from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'
import imagePath from './EPRI_logo_2021_RGB.png'

function Navbar(){
    return(
        // Navigation bar setting
        <Box container sx={{ position: 'sticky', zIndex: 100, bgcolor: '#f5f5f5', boxShadow: 3, top: 0}} pt={'1rem'} pb={'1rem'}
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
                        <a href="https://www.epri.com" target="_blank">
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
                        <Link to="/" style={{textDecoration: 'none'}}><Button>Home</Button></Link>
                    </Grid>

                    {/* Add Terms button setting */}
                    <Grid mr={'1rem'}>
                        <Link to="/" style={{textDecoration: 'none'}}><Button>Add Terms</Button></Link>
                    </Grid>

                    {/* About button setting */}
                    <Grid>
                        <Link to="/about" style={{textDecoration: 'none'}}><Button>About</Button></Link>
                    </Grid>

                </Grid>

                {/* Right part: Search bar setting ************** NEED: work with backend ************** */}
                <Grid mr={'3rem'}>
                            <TextField style={{width: '12rem'}} id="outlined-basic" label="Search" variant="outlined" />
                </Grid>
        </Box>
    )
}
export default Navbar