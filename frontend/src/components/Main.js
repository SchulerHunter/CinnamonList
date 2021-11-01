import {Box, Grid, TextField, Card, CardContent, Typography, Stack} from '@mui/material'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from './Navbar'
import Listi from './Listi'

{/* **************** NEED: Responsive web?(for smaller screens, now it's only normal in full screen) **************** */}
function Main(){
    {/* **************** NEED: Read data from database(through JSON?) instead of typing here **************** */}

    // Data for sidebar(each levels)
    //const [data, setData] = useState({"Animal":{"Cordata":{"Mammal":["Homo Sapien", "Cow", "Sheep"], "Aves":["Chicken", "Duck", "Humming Bird"]}, "Arthropod":["Shrimp", "Crab", "Lobster"]}, "Fungi":{"Mucoromycota":["Bread Mold", "Tinea Pedis"]}, "Plant":{"Trach":{"Poales":["Wheat", "Barley"], "Fagales":["Oak", "Maple"]}}})
    const [data, setData] = useState({"AFW":{"children":["animal","fungi","plant"]},"animal":{"parent":"start","children":["cordata","arthropod"]},"cordata":{"parent":"animal","children":["mammal","aves"]},"mammal":{"parent":"cordata","data":{"abbr":["mam","mammy"],"syn":["Warm Blooded","Harries"],"desc":["Warm Blooded, Hair and Fur"]}},"aves":{"parent":"cordata","data":{"abbr":["bir","bi"],"syn":["bird","birdy","flyers"],"desc":["Warm Blooded creatures of flight"]}},"arthropod":{"parent":"cordata","data":{"abbr":["arth","arthro"],"syn":["creepy crawlies","side walkers"],"desc":["Crustacians and other things"]}},"fungi":{"parent":"start","children":["mucoromycota"]},"mucoromycota":{"parent":"fungi","data":{"abbr":["muc","myco"],"syn":["lunch mold","mold"],"desc":["things that grow in dark places"]}},"plant":{"parent":"start","children":["trach"]},"trach":{"parent":"plant","children":["poales","fagales"]},"poales":{"parent":"trach","data":{"abbr":["gr","whe"],"syn":["grain","starch"],"desc":["grain family? wheat and barley"]}},"fagales":{"parent":"trach","data":{"abbr":["tr","tre"],"syn":["tree","grower"],"desc":["A round thing that goes to the sky"]}}})
    
    // Data for main page(Definition, Synonym, and Acronym)  ********** NEED: Terms as well **********
    const [current, setCurrent] = useState({
        "def":["A mathematical tool used by Reliability Engineers to determine the reliability requirements for individual components or assemblies that would be needed to achieve the desired overall reliability goal for the system."],
        "syn":["Allocation Analysis Synonym Test1","Allocation Analysis Synonym Test2"],
        "acy":["Allocation Analysis Acronym Test1", "Allocation Analysis Acronym Test2", "Allocation Analysis Acronym Test3"]})
    {/* **************** NEED: Read data from database(through JSON?) instead of typing here **************** */}
    
    return(
        <div>
            {/* Section1: Navigation Bar */}
            <Navbar />

            {/* Section2: Main Body */}
            <Box sx={{ flexGrow: 1 }} p={2} pt={5}>
                <Grid container spacing={8}>

                    {/* Section2.1: Sidebar */}
                    <Grid item md={2.5}>
                        <Listi data={data} setCurrent={setCurrent}/>
                    </Grid>

                    {/* Section2.2: Information Area */}
                    <Grid item md={8} p={2}>
                        <Stack spacing={5}>

                            {/* Section2.2.1: Terms Info */}
                            <Card pb={2}>
                                <CardContent>
                                    <h2>Term</h2>
                                    <ul><li>Allocation Analysis</li></ul>
                                </CardContent>
                            </Card>

                            {/* Section2.2.2: Definition Info */}
                            <Card pb={2}>
                                <CardContent>
                                    <h2>Definition</h2>
                                    <ul>
                                        {current["def"].map(thing => (<li style={{lineHeight: 2}} key={thing}>{thing}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>
                            
                            {/* Section2.2.3: Synonym Info */}
                            <Card pb={2}>
                                <CardContent>
                                    <h2>Synonym</h2>
                                    <ul>
                                        {current["syn"].map(thing => (<li style={{lineHeight: 2}} key={thing}>{thing}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Section2.2.2: Acronym Info */}
                            <Card pb={2}>
                                <CardContent>
                                    <h2>Acronym</h2>
                                    <ul>
                                        {current["acy"].map(thing => (<li style={{lineHeight: 2}} key={thing}>{thing}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            {/* **************** We might need a footer here (section3) **************** */}
        </div>
    )
}

export default Main