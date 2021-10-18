import {Grid, Box, Button} from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'

function Navbar(){
    return(
        <Box sx={{ flexGrow: 1 }} pt={2}>
            <Grid container spacing={2}>
                <Grid item md={1}></Grid>
                <Grid item md={8}>
                    <h3>ERPI Dictionary</h3>
                </Grid>
                <Grid item md={1}>
                    <Link to="/about"><Button>About</Button></Link>
                </Grid>
                <Grid item md={1}>
                    <Link to="/"><Button>Dictionary</Button></Link>
                </Grid>
                <Grid item md={1}></Grid>
            </Grid>
        </Box>
    )
}

export default Navbar