import React from 'react'
import {Box, Button, CardMedia, Grid} from '@mui/material'

import imagePath from '../static/EPRI_logo_2021_RGB.png'
import SearchBox from './SearchBox'

export default class Navbar extends React.Component {
    render() {
        return (
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
                                <Button onClick={() => this.props.pageCallback(1)}><b>Home</b></Button>
                            </Grid>

                            {/* Add Terms button setting */}
                            <Grid mr={'1rem'}>
                                <Button onClick={() => this.props.pageCallback(2)}><b>Bulk Edit</b></Button>
                            </Grid>

                            {/* About button setting */}
                            <Grid>
                                <Button onClick={() => this.props.pageCallback(3)}><b>About</b></Button>
                            </Grid>

                        </Grid>

                        {/* Right part: Search bar setting */}
                        <Grid mr={'3rem'} >
                            <SearchBox dataCallback={this.props.dataCallback}/>
                        </Grid>
                </Box>
                { this.props.page === 1 && Object.keys(this.props.subTabs).length > 0 &&
                    <Box container sx={{ position: 'sticky', zIndex: 99, bgcolor: '#f5f5f5', boxShadow: 3, top: 0}} pt={'.5rem'} pb={'.5rem'}
                    display={'flex'} 
                    flexDirection={'row'} 
                    alignItems="center" 
                    justifyContent="space-between">
                        <Grid display={'flex'} 
                            flexDirection={'row'} 
                            alignItems="center" 
                            justifyContent="space-start"
                            ml={'3rem'}>
                                { this.props.subTabs.root.map((item) => {
                                    return(
                                        <Grid mr={'1rem'} key={item[0]}>
                                            <Button onClick={() => this.props.dataCallback(item[0])}><b>{item[1]}</b></Button>
                                        </Grid>
                                    )
                                })}
                        </Grid>
                    </Box>
                }
            </div>
        )
    }
}