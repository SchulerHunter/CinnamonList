import {Box, Grid, Card, CardContent, Stack} from '@mui/material'
import {getHierarchy} from './utility/apiConnection'
import {React, useState} from 'react'
import Navbar from './Navbar'
import HierarchyList from './HierarchyList'
import Footer from'./Footer'

{/* **************** NEED: Responsive web?(for smaller screens, now it's only normal in full screen) **************** */}
function Main() {
    const [current, setCurrent] = useState({
        "def":["A mathematical tool used by Reliability Engineers to determine the reliability requirements for individual components or assemblies that would be needed to achieve the desired overall reliability goal for the system."],
        "syn":["Allocation Analysis Synonym Test1","Allocation Analysis Synonym Test2"],
        "acy":["Allocation Analysis Acronym Test1", "Allocation Analysis Acronym Test2", "Allocation Analysis Acronym Test3"]})
    const data = getHierarchy()
    return(
        <div>
            {/* Section1: Navigation Bar */}
            <Navbar />

            {/* Section2: Main Body */}
            <Box sx={{ flexGrow: 1 }} pt={5} pb={5} pl={2}>
                <Grid container spacing={5}>

                    {/* Section2.1: Sidebar */}
                    <Grid item md={3}>
                        <HierarchyList data={data} setCurrent={setCurrent}/>
                    </Grid>

                    {/* Section2.2: Information Area */}
                    <Grid item md={7}>
                        <Stack spacing={2}>

                            {/* Section2.2.1: Terms Info */}
                            <Grid container justifyContent="center" bgcolor={'#f5f5f5'} borderRadius='5px' sx={{boxShadow: 3}}>
                                <h2>Allocation Analysis</h2>
                            </Grid>

                            {/* Section2.2.2: Definition Info */}
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h2>&ensp;Definition</h2>
                                    <ul>
                                        {current["def"].map(def => (<li style={{lineHeight: 2}} key={def}>{def}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>
                            
                            {/* Section2.2.3: Synonym Info */}
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h2>&ensp;Synonym</h2>
                                    <ul>
                                        {current["syn"].map(syn => (<li style={{lineHeight: 2}} key={syn}>{syn}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Section2.2.2: Acronym Info */}
                            <Card sx={{boxShadow: 3}}>
                                <CardContent>
                                    <h2>&ensp;Acronym</h2>
                                    <ul>
                                        {current["acy"].map(acy => (<li style={{lineHeight: 2}} key={acy}>{acy}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            <Footer />
        </div>
    )
}

export default Main