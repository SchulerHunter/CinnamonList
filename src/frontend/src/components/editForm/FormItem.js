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

        this.termTimer = null
        this.parentTerms = [...this.props.parentTerms]

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

    shouldComponentUpdate = (nextProps, nextState) => {
        return (nextState.id !== this.state.id ||
                nextState.pid !== this.state.pid ||
                nextState.term !== this.state.term ||
                nextState.def !== this.state.def ||
                nextState.syn !== this.state.syn ||
                nextState.acr !== this.state.acr ||
                nextProps.newTerms)
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        clearTimeout(this.termTimer)
        if (this.state.term && this.state.term !== prevState.term) {
            this.termTimer = setTimeout(this.termFinished, 2000)
        }

        if (prevState.id !== this.state.id ||
            prevState.pid !== this.state.pid ||
            prevState.def !== this.state.def ||
            prevState.syn !== this.state.syn ||
            prevState.acr !== this.state.acr) {
                this.props.editCallback(this.props.index, this.state)
            }
    }

    onIDChange = (event) => {
        const id = parseInt(event.target.value)
        if (this.state.id === 0 && id !== this.state.id) {
            let isParent = false
            for (const item of Object.values(this.props.IDs)) {
                if (item.parent === this.props.indexToId[this.props.index]) {
                    isParent = true
                    break
                }
            }
            if (isParent) {
                this.setState({
                    id: 0,
                    warningModal: true
                })
                return
            }
        }

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
        this.setState({pid: parseInt(event.target.value)})
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

    termFinished = () => {
        this.props.editCallback(this.props.index, this.state)
    }

    testNewHierarchy = () => {
        if (this.state.pid !== 0) {
            let currID = this.state.pid
            let idPath = [currID]
            while (this.props.IDs[currID].parent !== null) {
                currID = this.props.IDs[currID].parent
                idPath.push(currID)
            }
            idPath.reverse()
        
            return this.recursiveDictTest(this.props.hierarchy[idPath[0]], idPath.slice(1), this.props.indexToId[this.props.index])
        } else {
            return (this.props.hierarchy[this.props.indexToId[this.props.index]] !== undefined)
        }
    }

    recursiveDictTest = (subDict, keys, itemKey) => {
        if (subDict === undefined) {
            return false
        }
        if (keys.length === 0) {
            return (subDict[itemKey] !== undefined)
        } else {
            return this.recursiveDictGet(subDict[keys[0]], keys.slice(1), itemKey)
        }
    }

    recursiveDictGet = (subDict, keys, itemKey) => {
        if (keys.length === 0) {
            return subDict[itemKey]
        } else {
            return this.recursiveDictGet(subDict[keys[0]], keys.slice(1), itemKey)
        }
    }

    recursiveDictToList = (subDict) => {
        let keys = Object.keys(subDict)
        Object.keys(subDict).forEach((key) => {
            keys = keys.concat(this.recursiveDictToList(subDict[key]))
        })
        return keys
    }

    render() {
        if (this.state.id === 0 && this.props.newTerms) {
            this.parentTerms = [...this.props.parentTerms]
            if (this.state.pid !== -99999 && this.testNewHierarchy()) {
                // Only run this code block if the item has a parent and is updated in the hierarchy
                let itemHierarchy = {}
                if (this.state.pid !== 0) {
                    // Fetch the ID Path to the term
                    let currID = this.state.pid
                    let idPath = [currID]
                    while (this.props.IDs[currID].parent !== null) {
                        currID = this.props.IDs[currID].parent
                        idPath.push(currID)
                    }
                    idPath.reverse()
                    // Recursively travel through the hierarchy to find the sub tree
                    itemHierarchy = this.recursiveDictGet(this.props.hierarchy[idPath[0]], idPath.slice(1), this.props.indexToId[this.props.index])
                } else {
                    // If the item is a root, it can be easily selected
                    itemHierarchy = this.props.hierarchy[this.props.indexToId[this.props.index]]
                }

                // Build a list of all items in the subhierarchy of the item
                let itemKeys = this.recursiveDictToList(itemHierarchy)
                itemKeys = itemKeys.map((val) => {
                    return parseInt(val)
                })
                itemKeys.push(this.props.indexToId[this.props.index])

                // Disable every item which is in the sub hierarchy of the term, including itself
                this.parentTerms.forEach((item, index) => {
                    if (itemKeys.includes(parseInt(item.key))) {
                        this.parentTerms[index] = React.cloneElement(this.parentTerms[index], {disabled: true})
                    }
                })
            }
        }

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
                                            { this.parentTerms }
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