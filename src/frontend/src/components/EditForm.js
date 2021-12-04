import React from 'react'
import {Button, Card, CardContent, Stack, TextField, Grid, IconButton} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default class EditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            def: "",
            syn: "",
            acr: "",
            ter: "",
            pid: "",
        }
    }

    onDefinitionChange = (event) => {
        this.setState({
            def: event.target.value
        })
    }

    onSynonymChange = (event) => {
        this.setState({
            syn: event.target.value
        })
    }

    onAcronymChange = (event) => {
        this.setState({
            acr: event.target.value
        })
    }

    onTermChange = (event) => {
        this.setState({
            ter: event.target.value
        })
    }

    onPidChange = (event) => {
        this.setState({
            pid: event.target.value
        })
    }

    bulkClick = () => {
        const content = {
            "-1": {
                definition: this.state.def,
                synonyms: this.state.syn,
                acronyms: this.state.acr,
                term: this.state.ter,
                parent_id: this.state.pid
            }
        }

        this.props.bulkEditCallback(content)
    }

    render() {
        return (
            // <div>
            //     <Stack paddingX={10} paddingY={5} direction="row" sx={{justifyContent: 'space-between'}}>

            //         {/* Adding Term */}
            //         <Card sx={{boxShadow: 3, width: '45%'}}>
            //             <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Term</h3>
            //             <div style={{ padding: '.5rem'}}>
            //                 <TextField
            //                     id="outlined-multiline-static"
            //                     label="Term"
            //                     multiline
            //                     fullWidth
            //                     rows={4}
            //                     onChange={this.onTermChange}
            //                     />
            //             </div>

            //             {/* Adding Definition */}
            //             <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Definition</h3>
            //             <div style={{ padding: '.5rem'}}>
            //                 <TextField
            //                     id="outlined-multiline-static"
            //                     label="Definition"
            //                     multiline
            //                     fullWidth
            //                     rows={4}
            //                     onChange={this.onDefinitionChange}
            //                     />
            //             </div>

            //             {/* Adding Synonyms */}
            //             <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Synonyms</h3>
            //             <div style={{ padding: '.5rem'}}>
            //                 <TextField
            //                     id="outlined-multiline-static"
            //                     label="Synonyms"
            //                     multiline
            //                     fullWidth
            //                     rows={4}
            //                     onChange={this.onSynonymChange}
            //                     />
            //             </div>

            //             {/* Adding Acronyms */}
            //             <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Acronyms</h3>
            //             <div style={{ padding: '.5rem'}}>
            //                 <TextField
            //                     id="outlined-multiline-static"
            //                     label="Acronyms"
            //                     multiline
            //                     fullWidth
            //                     rows={4}
            //                     onChange={this.onAcronymChange}
            //                     />
            //             </div>
            //         </Card>

            //         {/* Testing purpose: will change to select box later */}
            //         <Card sx={{boxShadow: 3, width: '45%'}}>
            //             <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Select Parent</h3>
            //             <CardContent sx={{paddingX: '2rem'}}>
            //                 <TextField
            //                     id="outlined-multiline-static"
            //                     label="Select parent"
            //                     multiline
            //                     fullWidth
            //                     rows={4}
            //                     onChange={this.onPidChange}
            //                     />
            //             </CardContent>
            //         </Card>
            //     </Stack>

            //     {/* Submit button */}
            //     <Stack paddingBottom='3rem' direction="row" sx={{justifyContent: 'center'}}>
            //         <Button variant="contained" onClick={() => this.bulkClick()}><b>{"Submit"}</b></Button>
            //     </Stack>
            // </div>

            <div>

                {/* Top Grid */}
                <Grid container marginY={'3rem'} paddingLeft={'5rem'} paddingRight={'5rem'}
                    display={'flex'} 
                    flexDirection={'row'} 
                    alignItems="center" 
                    justifyContent="space-between">

                    <h1>Dictionary Bulk Edit</h1>

                    <Button variant="contained" onClick={() => this.bulkClick()}><b>{"Done"}</b></Button>
                </Grid>

                {/* Card content */}
                <Stack paddingX={10} direction="column" sx={{justifyContent: 'space-between'}}>

                    {/* Top Card */}
                    <Grid container sx={{backgroundColor: '#557A95', boxShadow: 3, width: '70%%'}} mb='3rem'
                        borderRadius='1%'
                        paddingX='1.5rem'
                        paddingY='1.5rem'
                        display={'flex'} 
                        flexDirection={'row'} 
                        justifyContent="space-between">

                            {/* Selecting Term */}
                            <Card sx={{boxShadow: 3, width: '19%'}}>
                                <h3 style={{textAlign: 'center', backgroundColor: '#9CB5EE', margin: 0}}>Term</h3>
                                <CardContent>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Select Term"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    onChange={this.onTermChange}
                                    />
                                </CardContent>
                            </Card>

                            {/* Selecting Definition */}
                            <Card sx={{boxShadow: 3, width: '19%'}}>
                                <h3 style={{textAlign: 'center', backgroundColor: '#9CB5EE', margin: 0}}>Definition</h3>
                                <CardContent>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Enter Definition"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    onChange={this.onDefinitionChange}
                                    />
                                </CardContent>
                            </Card>

                            {/* Selecting Synonyms */}
                            <Card sx={{boxShadow: 3, width: '19%'}}>
                                <h3 style={{textAlign: 'center', backgroundColor: '#9CB5EE', margin: 0}}>Synonyms</h3>
                                <CardContent>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Enter Synonyms"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    onChange={this.onSynonymChange}
                                    />
                                </CardContent>
                            </Card>

                            {/* Selecting Acronyms */}
                            <Card sx={{boxShadow: 3, width: '19%'}}>
                                <h3 style={{textAlign: 'center', backgroundColor: '#9CB5EE', margin: 0}}>Acronyms</h3>
                                <CardContent>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Enter Acronyms"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    onChange={this.onAcronymChange}
                                    />
                                </CardContent>
                            </Card>

                            {/* Selecting Parent */}
                            <Card sx={{boxShadow: 3, width: '19%'}}>
                                <h3 style={{textAlign: 'center', backgroundColor: '#9CB5EE', margin: 0}}>Parent</h3>
                                <CardContent>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Select Parent"
                                    multiline
                                    fullWidth
                                    rows={4}
                                    onChange={this.onPidChange}
                                    />
                                </CardContent>
                            </Card>
                    </Grid>

                    {/* Add new card button */}
                    <Grid mx='15rem'
                        display={'flex'}
                        flexDirection={'row'} 
                        alignItems="center" 
                        justifyContent="flex-end">

                        <IconButton color='primary' aria-label="add new card">
                            <AddCircleIcon fontSize="large"/>
                        </IconButton>
                        <p> - On click adds a new card</p>
                    </Grid>
                </Stack>
            </div>
        )
    }
}