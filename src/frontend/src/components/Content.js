import React from 'react'
import {Button, Box, Grid, Card, CardContent, Modal, Stack, TextField, Typography} from '@mui/material'

import HierarchyList from './hierarchy/HierarchyList'

/* **************** NEED: Responsive web?(for smaller screens, now it's only normal in full screen) **************** */
export default class Content extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            def: props.content.def,
            syn: props.content.syn.join("\n"),
            acr: props.content.acr.join("\n"),
            definitionEdit: false,
            synonymEdit: false,
            acronymEdit: false,
            editModal: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.content.term !== this.props.content.term || 
            prevProps.content.def !== this.props.content.def ||
            prevProps.content.syn !== this.props.content.syn ||
            prevProps.content.acr !== this.props.content.acr) {
            this.setState({
                def: this.props.content.def,
                syn: this.props.content.syn.join("\n"),
                acr: this.props.content.acr.join("\n")
            })
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

    closeModal = () => {
        this.setState({
            editModal: false
        })
    }

    definitionClick = () => {
        if (this.state.synonymEdit || this.state.acronymEdit) {
            this.setState({
                editModal: true
            })
        } else {
            if (this.state.definitionEdit) {
                const def = this.state.def.trim().replace(/  +/gm, " ").replace(/( [\r\n]|[\r\n] )/gm, "\n").replace(/[\r\n][\r\n]+/gm, "\n\n")
                if (def !== this.props.content.def) {
                    const content = {
                        definition: def,
                        synonyms: this.state.syn.replace(/[\r\n]+/gm, ";"),
                        acronyms: this.state.acr.replace(/[\r\n]+/gm, ";")
                    }
    
                    this.props.editTermCallback(content)
                }

                this.setState({
                    def: this.props.content.def,
                    definitionEdit: false
                })
            } else {
                this.setState({
                    definitionEdit: true
                })
            }
        }
    }

    synonymClick = () => {
        if (this.state.definitionEdit || this.state.acronymEdit) {
            this.setState({
                editModal: true
            })
        } else {
            if (this.state.synonymEdit) {
                const syn = this.state.syn.trim().replace(/  +/gm, " ").replace(/( [\r\n]|[\r\n] )/gm, "\n").replace(/[\r\n]+/gm, ";")
                if (syn !== this.props.content.syn.join(";")) {
                    const content = {
                        definition: this.state.def,
                        synonyms: syn,
                        acronyms: this.state.acr.replace(/[\r\n]/gm, ";")
                    }
    
                    this.props.editTermCallback(content)
                }

                this.setState({
                    syn: this.props.content.syn.join("\n"),
                    synonymEdit: false
                })
            } else {
                this.setState({
                    synonymEdit: true
                })
            }
        }
    }

    acronymClick = () => {
        if (this.state.definitionEdit || this.state.synonymEdit) {
            this.setState({
                editModal: true
            })
        } else {
            if (this.state.acronymEdit) {
                const acr = this.state.acr.trim().replace(/  +/gm, " ").replace(/( [\r\n]|[\r\n] )/gm, "\n").replace(/[\r\n]+/gm, ";")
                if (acr !== this.props.content.acr.join(";")) {
                    const content = {
                        definition: this.state.def,
                        synonyms: this.state.syn.replace(/[\r\n]/gm, ";"),
                        acronyms: acr
                    }
    
                    this.props.editTermCallback(content)
                }

                this.setState({
                    acr: this.props.content.acr.join("\n"),
                    acronymEdit: false
                })
            } else {
                this.setState({
                    acronymEdit: true
                })
            }
        }
    }

    render() {
        return (
            <>
                <Box sx={{ flexGrow: 1 }} pt={5} pb={5} pl={2}>
                    <Grid container spacing={5}>

                        {/* Section 1: Sidebar */}
                        <Grid item md={3}>
                            <HierarchyList
                                idPath={this.props.idPath}
                                hierarchy={this.props.hierarchy}
                                IDs={this.props.IDs}
                                dataCallback={this.props.dataCallback}
                            />
                        </Grid>

                        {/* Section 2: Information Area */}
                        <Grid item md={7}>
                            <Stack spacing={2}>

                                {/* Section 2.1: Terms Info */}
                                <Grid container justifyContent="center" bgcolor={'#f5f5f5'} borderRadius='5px' sx={{boxShadow: 3}}>
                                    <h2>{this.props.content.term}</h2>
                                </Grid>

                                {/* Section 2.2: Definition Info */}
                                <Card sx={{boxShadow: 3}}>
                                    <CardContent>
                                        <Box display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            >
                                            <Grid mr="1rem" ml="2rem">
                                                <h2>Definition</h2>
                                            </Grid>
                                            <Grid mr="1rem">
                                                <Button variant="contained" onClick={this.definitionClick}>{this.state.definitionEdit ? "Finish" : "Edit"}</Button>
                                            </Grid>
                                        </Box>
                                        { this.state.definitionEdit ? (
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Definition"
                                                    multiline
                                                    fullWidth
                                                    rows={4}
                                                    onChange={this.onDefinitionChange}
                                                    value={this.state.def}
                                                />
                                            ) : (
                                                <Typography ml='2.5rem' variant="p" whiteSpace="pre">{this.props.content.def}</Typography>
                                            )
                                            
                                        }
                                    </CardContent>
                                </Card>
                                
                                {/* Section 2.3: Synonym Info */}
                                <Card sx={{boxShadow: 3}}>
                                    <CardContent>
                                    <Box display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            >
                                            <Grid mr="1rem" ml="2rem">
                                                <h2>Synonyms</h2>
                                            </Grid>
                                            <Grid mr="1rem">
                                            <Button variant="contained" onClick={this.synonymClick}>{this.state.synonymEdit ? "Finish" : "Edit"}</Button>
                                            </Grid>
                                        </Box>
                                        { this.state.synonymEdit ? (
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Add each synonym on a new line"
                                                    multiline
                                                    fullWidth
                                                    rows={4}
                                                    onChange={this.onSynonymChange}
                                                    value={this.state.syn}
                                                />
                                            ) : (
                                                <ul>
                                                    { this.props.content.syn.map(syn => (<li style={{lineHeight: 2}} key={syn}>{syn}</li>)) }
                                                </ul>
                                            ) 
                                        }
                                    </CardContent>
                                </Card>

                                {/* Section 2.4: Acronym Info */}
                                <Card sx={{boxShadow: 3}}>
                                    <CardContent>
                                    <Box display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            >
                                            <Grid mr="1rem" ml="2rem">
                                                <h2>Acronyms</h2>
                                            </Grid>
                                            <Grid mr="1rem">
                                                <Button variant="contained" onClick={this.acronymClick}>{this.state.acronymEdit ? "Finish" : "Edit"}</Button>
                                            </Grid>
                                        </Box>
                                        { this.state.acronymEdit ? (
                                                <TextField
                                                id="outlined-multiline-static"
                                                label="Add each acronym on a new line"
                                                multiline
                                                fullWidth
                                                rows={4}
                                                onChange={this.onAcronymChange}
                                                value={this.state.acr}
                                                />
                                            ) : (
                                                <ul>
                                                    { this.props.content.acr.map(acr => (<li style={{lineHeight: 2}} key={acr}>{acr}</li>)) }
                                                </ul>
                                            ) 
                                        }
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
                <Modal open={this.state.editModal} onClose={this.closeModal}>
                    <Box sx={{
                        position:"absolute",
                        top:"50%", left:"50%",
                        transform:"translate(-50%, -50%)",
                        boxShadow:24, p:4,
                        bgcolor:"background.paper"}}>
                        <Typography variant="h6" component="h2">Please only edit one item at a time</Typography>
                    </Box>
                </Modal>
            </>
        )
    }
}