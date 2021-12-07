import React from 'react'
import {Box, Card, CardContent, FormControl, Grid, MenuItem, Modal, Select, TextField, Typography} from '@mui/material'

import {getItem} from '../utility/apiConnection'

export default class FormItem extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.content.id === 0) {
            this.width = "15%"
        } else {
            this.width = "22.5%"
        }

        this.state = {
            id: this.props.content.id,
            pid: this.props.content.pid,
            term: this.props.content.term,
            def: this.props.content.def,
            syn: this.props.content.syn,
            acr: this.props.content.acr,
            warningModal: false
        }
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.content.id !== this.state.id ||
            prevProps.content.pid !== this.state.pid ||
            prevProps.content.term !== this.state.term ||
            prevProps.content.def !== this.state.def ||
            prevProps.content.syn !== this.state.syn ||
            prevProps.content.acr !== this.state.acr) {
                if (prevState.id === 0 && prevState.id !== this.state.id) {
                    Object.values(this.props.IDs).forEach((val) => {
                        if (val.parent === prevProps.content.id) {
                            this.setState({
                                id: 0,
                                warningModal: true
                            })
                            this.props.editCallback(this.props.index, prevState)
                            return
                        }
                    })
                }
                this.props.editCallback(this.props.index, this.state)
            }
    }



    onIDChange = (event) => {
        const id = event.target.value
        if (id === 0) {
            this.width = "15%"
            this.setState({
                id: 0,
                pid: -99999,
                term: "",
                def: "",
                syn: "",
                acr: ""
            })
        } else {
            this.width = "22.5%"
            getItem(id).then((result) => {
                this.setState({
                    id: id,
                    pid: this.props.IDs[id].parent,
                    term: this.props.IDs[id].term,
                    def: result.def,
                    syn: result.syn.join("\n"),
                    acr: result.acr.join("\n")
                })
            })
        }
    }

    onPIDChange = (event) => {
        this.setState({pid: event.target.value})
    }

    onTermChange = (event) => {
        this.setState({term: event.target.value})
    }

    onDefChange = (event) => {
        this.setState({def: event.target.value})
    }

    onSynChange = (event) => {
        this.setState({syn: event.target.value})
    }

    onAcrChange = (event) => {
        this.setState({acr: event.target.value})
    }

    closeModal = () => {
        this.setState({warningModal: false})
    }

    render() {
        return (
            <>
                <Card key={this.props.index} sx={{boxShadow: 3, width: "100%", marginBottom: "1rem"}}>
                    <CardContent>
                        <Grid container display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                            <FormControl sx={{width: this.width}}>
                                <Select
                                    fullWidth
                                    value={this.state.id} 
                                    onChange={this.onIDChange}
                                    >
                                    <MenuItem key={-99999} value={-99999} disabled>Select a term to edit</MenuItem>
                                    <MenuItem key={0} value={0}><b>Add New Term</b></MenuItem>
                                    { this.props.selectTerms }
                                </Select>
                            </FormControl>
                            { this.state.id === 0 &&
                                <>
                                    <FormControl sx={{width: this.width}}>
                                        <Select
                                            fullWidth
                                            value={this.state.pid}
                                            onChange={this.onPIDChange}
                                            >

                                            <MenuItem key={-99999} value={-99999} disabled>Select a parent term</MenuItem>
                                            <MenuItem key={0} value={0}><b>None</b></MenuItem>
                                            { this.props.parentTerms }
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        id="outlined-multiline-static"
                                        sx={{width: this.width}}
                                        label="Term"
                                        value={this.state.term}
                                        onChange={this.onTermChange}
                                        />
                                </>
                            }

                            <TextField
                                id="outlined-multiline-static"
                                sx={{width:this.width}}
                                label="Definition"
                                multiline
                                rows={4}
                                value={this.state.def}
                                onChange={this.onDefChange}
                                />

                            <TextField
                                id="outlined-multiline-static"
                                sx={{width: this.width}}
                                label="Add Each Synonym On A New Line"
                                multiline
                                rows={4}
                                value={this.state.syn}
                                onChange={this.onSynChange}
                                />

                            <TextField
                                id="outlined-multiline-static"
                                sx={{width:this.width}}
                                label="Add Each Acronym On A New Line"
                                multiline
                                rows={4}
                                value={this.state.acr}
                                onChange={this.onAcrChange}
                                />
                            </Grid>
                    </CardContent>
                </Card>
                <Modal open={this.state.warningModal} onClose={this.closeModal}>
                    <Box sx={{
                        position:"absolute",
                        top:"50%", left:"50%",
                        transform:"translate(-50%, -50%)",
                        boxShadow:24, p:4,
                        bgcolor:"background.paper"}}>
                        <Typography variant="h6" component="h2">You can not switch this term while this term has child terms</Typography>
                    </Box>
                </Modal>
            </>
        )
    }
}