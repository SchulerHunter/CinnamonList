import React from 'react'
import {Button, Card, CardContent, Stack, TextField, Grid, IconButton, Box} from '@mui/material'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HierarchyList from './hierarchy/HierarchyList'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

    clickHandler = () => {
        this.props.dataCallback(this.props.id)
    }

    render() {
        return (
            <div>
                {/* Top Direction */}
                <Grid container marginY={'3rem'} paddingX={'8rem'}
                    display={'flex'} 
                    flexDirection={'row'} 
                    alignItems="center" 
                    justifyContent="space-between">

                    <h1>Dictionary Bulk Edit</h1>
                    <Button variant="contained" onClick={() => this.bulkClick()}><b>{"Done"}</b></Button>
                </Grid>


                {/* Card Area */}
                <Stack paddingX={10} direction="column" sx={{justifyContent: 'space-between'}}>

                    {/* Card Set*/}
                    <Grid container sx={{backgroundColor: '#CACED5', boxShadow: 3, width: '70%%'}} mb='3rem'
                        borderRadius='1%'
                        paddingX='1.5rem'
                        paddingY='1.5rem'
                        display={'flex'} 
                        flexDirection={'row'} 
                        justifyContent="space-between">

                            {/* Selecting Term */}
                            <Card sx={{boxShadow: 3, width: '23%'}}>
                                <h3 style={{textAlign: 'center', backgroundColor: '#9CB5EE', margin: 0}}>Term</h3>
                                <CardContent>
                                    <FormControl fullWidth>
                                        <InputLabel>Select a Term</InputLabel>
                                        <Select 
                                            value={this.term} 
                                            onChange={this.onTermChange}
                                            >

                                            <MenuItem value='none'><b>ADD NEW</b></MenuItem>
                                            { this.props.subTabs.root.map((item) => {
                                                return(
                                                    <MenuItem ><p>{this.props.content.term}</p></MenuItem>
                                                )
                                            })}
                                        </Select>
                                </FormControl>
                                </CardContent>
                            </Card>

                            {/* Selecting Definition */}
                            <Card sx={{boxShadow: 3, width: '23%'}}>
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
                            <Card sx={{boxShadow: 3, width: '23%'}}>
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
                            <Card sx={{boxShadow: 3, width: '23%'}}>
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
                    </Grid>

                    {/* Add new card button */}
                    <Grid marginX='15rem'
                        display={'flex'}
                        flexDirection={'row'} 
                        alignItems="center" 
                        justifyContent="flex-end">

                        <IconButton color='primary' aria-label="add new card">
                            <AddCircleIcon fontSize="large"/>
                        </IconButton>
                        <b> — On click adds a new card</b>
                    </Grid>

                    {/* Pop up Parent Selecting */}
                    <Card sx={{boxShadow: 3, width: '23%'}}>
                        <h3 style={{textAlign: 'center', backgroundColor: '#9CB5EE', margin: 0}}>Parent</h3>
                        <CardContent>
                            <FormControl fullWidth>
                                <InputLabel>Select a Parent</InputLabel>
                                <Select 
                                    value={this.term} 
                                    onChange={this.onPidChange}
                                    >

                                    <MenuItem value='none'><b>ADD NEW</b></MenuItem>
                                    { this.props.subTabs.root.map((item) => {
                                        return(
                                            <MenuItem ><p>{item[1]}</p></MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>

                </Stack>
            </div>
        )
    }
}