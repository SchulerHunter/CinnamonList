import {Grid, Box, Button, CardMedia, TextField} from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'
import SvgIcon from '@mui/material/SvgIcon';
import imagePath from './EPRI_logo_2021_Black.png'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Navbar(){
    return(
        // Footer setting
        <Box container sx={{ zIndex: 100, bgcolor: '#f5f5f5', boxShadow: 3, bottom: 0}}>

                <Grid display={'flex'} ml={'7rem'} mr={'7rem'} height={'12rem'}
                    flexDirection={'row'} 
                    alignItems="center" 
                    justifyContent="space-between">

                    {/* Footer EPRI logo */}
                    <Grid>
                        <CardMedia
                            component="img"
                            sx={{ maxWidth: 150 }}
                            image={imagePath}
                            alt="EPRI LOGO"
                        />
                    </Grid>

                    {/* Footer Info */}
                    <Grid>
                        <p style={{fontSize: '12px'}}>EPRI 3420 Hillview Avenue, Palo Alto, California 94304 | 800-313-3774 </p>
                        <p style={{fontSize: '12px'}}>© Electric Power Research Institute, Inc. 2001-2021. All Rights Reserved </p>
                        <p style={{fontSize: '12px'}}>TOGETHER…SHAPING THE FUTURE OF ENERGY™ </p>
                    </Grid>

                    {/* Footer Links */}
                    <Grid>
                        <a style={{color: 'black', marginLeft: '.5rem'}} href="https://twitter.com/eprinews" target="_blank">
                            <SvgIcon fontSize={'large'} component={TwitterIcon} />
                        </a>
                        <a style={{color: 'black', marginLeft: '.5rem'}} href="https://www.linkedin.com/company/epri" target="_blank">
                            <SvgIcon fontSize={'large'} component={LinkedInIcon} />
                        </a>
                        <a style={{color: 'black', marginLeft: '.5rem'}} href="https://www.facebook.com/EPRI/" target="_blank">
                            <SvgIcon fontSize={'large'} component={FacebookIcon} />
                        </a>
                        <a style={{color: 'black', marginLeft: '.5rem'}} href="https://www.youtube.com/channel/UCctcciH1NrAGpwMnKwvnLgQ" target="_blank">
                            <SvgIcon fontSize={'large'} component={YouTubeIcon} />
                        </a>
                    </Grid>
                </Grid>
        </Box>
    )
}
export default Navbar