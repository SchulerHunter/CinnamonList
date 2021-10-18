import {Box, Grid, TextField, Card, CardContent, Typography, Stack} from '@mui/material'
import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from './Navbar'
import Listi from './Listi'

function Main(){
    //const [data, setData] = useState({"Animal":{"Cordata":{"Mammal":["Homo Sapien", "Cow", "Sheep"], "Aves":["Chicken", "Duck", "Humming Bird"]}, "Arthropod":["Shrimp", "Crab", "Lobster"]}, "Fungi":{"Mucoromycota":["Bread Mold", "Tinea Pedis"]}, "Plant":{"Trach":{"Poales":["Wheat", "Barley"], "Fagales":["Oak", "Maple"]}}})
    const [data, setData] = useState({"start":{"children":["animal","fungi","plant"]},"animal":{"parent":"start","children":["cordata","arthropod"]},"cordata":{"parent":"animal","children":["mammal","aves"]},"mammal":{"parent":"cordata","data":{"abbr":["mam","mammy"],"syn":["Warm Blooded","Harries"],"desc":["Warm Blooded, Hair and Fur"]}},"aves":{"parent":"cordata","data":{"abbr":["bir","bi"],"syn":["bird","birdy","flyers"],"desc":["Warm Blooded creatures of flight"]}},"arthropod":{"parent":"cordata","data":{"abbr":["arth","arthro"],"syn":["creepy crawlies","side walkers"],"desc":["Crustacians and other things"]}},"fungi":{"parent":"start","children":["mucoromycota"]},"mucoromycota":{"parent":"fungi","data":{"abbr":["muc","myco"],"syn":["lunch mold","mold"],"desc":["things that grow in dark places"]}},"plant":{"parent":"start","children":["trach"]},"trach":{"parent":"plant","children":["poales","fagales"]},"poales":{"parent":"trach","data":{"abbr":["gr","whe"],"syn":["grain","starch"],"desc":["grain family? wheat and barley"]}},"fagales":{"parent":"trach","data":{"abbr":["tr","tre"],"syn":["tree","grower"],"desc":["A round thing that goes to the sky"]}}})
    const [current, setCurrent] = useState({"abbr":["mam","mammy"],"syn":["Warm Blooded","Harries"],"desc":["Warm Blooded, Hair and Fur"]})

    return(
        <div>
            <Navbar />
            <Box sx={{ flexGrow: 1 }} p={2}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Listi data={data} setCurrent={setCurrent}/>
                    </Grid>
                    <Grid item md={6} p={2}>
                        <Stack spacing={2}>
                            <Card pb={2}>
                                <CardContent>
                                    <h1>Abbreviation</h1>
                                    <ul>
                                        {current["abbr"].map(thing => (<li key={thing}>{thing}</li>))}
                                        {/*current["abbr"]*/}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card pb={2}>
                                <CardContent>
                                    <h1>Synonym</h1>
                                    <ul>
                                        {current["syn"].map(thing => (<li key={thing}>{thing}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card pb={2}>
                                <CardContent>
                                    <h1>Description</h1>
                                    <ul>
                                        {current["desc"].map(thing => (<li key={thing}>{thing}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Main