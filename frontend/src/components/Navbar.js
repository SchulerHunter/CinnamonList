import {Grid, Box, Button, CardMedia, TextField} from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'
import imagePath from './EPRI_logo_2021_RGB.png'

function Navbar(){
    return(
        // Navigation bar setting
        <Box sx={{ position: 'sticky', zIndex: 100, bgcolor: '#f5f5f5', boxShadow: 3, top: 0}} pr={5} pl={5} pt={4} pb={3}>
            <Grid container direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>

                {/* EPRI logo img setting */}
                <Grid item pr={5}>
                    <CardMedia
                        component="img"
                        sx={{ maxWidth: 150 }}
                        image={imagePath}
                        alt="EPRI LOGO"
                    />
                </Grid>

                {/* Home button setting */}
                <Grid item pr={2}>
                    <Link to="/" style={{textDecoration: 'none'}}><Button>Home</Button></Link>
                </Grid>

                {/* Add Terms button setting */}
                <Grid item pr={2}>
                    <Link to="/" style={{textDecoration: 'none'}}><Button>Add Terms</Button></Link>
                </Grid>

                {/* About button setting */}
                <Grid item pr={"40%"}>
                    <Link to="/about" style={{textDecoration: 'none'}}><Button>About</Button></Link>
                </Grid>

                {/* Search bar setting ************** NEED: work with backend ************** */}
                <Grid>
                    <TextField fullWidth id="outlined-basic" label="Search" variant="outlined" />
                </Grid>
            </Grid>
        </Box>
    )
}
export default Navbar