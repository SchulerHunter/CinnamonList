import React from 'react'
import {Button, Card, CardContent, Stack, TextField} from '@mui/material'

export default class EditForm extends React.Component {
    constructor() {
        super()
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
            definition: this.state.def,
            synonyms: this.state.syn,
            acronyms: this.state.acr,
            Term: this.state.ter,
            pid: this.state.pid
        }

        this.props.bulkCallback(content)
    }

    render() {
        return (
            <div>
                <Stack paddingX={10} paddingY={5} direction="row" sx={{justifyContent: 'space-between'}}>

                    {/* Adding Term */}
                    <Card sx={{boxShadow: 3, width: '45%'}}>
                        <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Term</h3>
                        <div style={{ padding: '.5rem'}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Term"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={this.onTermChange}
                                />
                        </div>

                        {/* Adding Definition */}
                        <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Definition</h3>
                        <div style={{ padding: '.5rem'}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Definition"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={this.onDefinitionChange}
                                />
                        </div>

                        {/* Adding Synonyms */}
                        <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Synonyms</h3>
                        <div style={{ padding: '.5rem'}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Synonyms"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={this.onSynonymChange}
                                />
                        </div>

                        {/* Adding Acronyms */}
                        <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Acronyms</h3>
                        <div style={{ padding: '.5rem'}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Acronyms"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={this.onAcronymChange}
                                />
                        </div>
                    </Card>

                    {/* Testing purpose: will change to select box later */}
                    <Card sx={{boxShadow: 3, width: '45%'}}>
                        <h3 style={{textAlign: 'center', backgroundColor: '#c4c4c4', margin: 0}}>Select Parent</h3>
                        <CardContent sx={{paddingX: '2rem'}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Select parent"
                                multiline
                                fullWidth
                                rows={4}
                                onChange={this.onPidChange}
                                />
                        </CardContent>
                    </Card>
                </Stack>

                {/* Submit button */}
                <Stack paddingBottom='3rem' direction="row" sx={{justifyContent: 'center'}}>
                    <Button variant="contained" onClick={() => this.bulkClick()}><b>{"Submit"}</b></Button>
                </Stack>
            </div>
        )
    }
}