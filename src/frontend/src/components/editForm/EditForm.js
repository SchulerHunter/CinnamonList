import React from 'react'
import {Button, Divider, Grid, IconButton, MenuItem, Stack, Tooltip} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

import FormItem from './FormItem';

export default class EditForm extends React.Component {
    constructor(props) {
        super(props)

        this.newItem = {
            id: -99999,
            pid: -99999,
            term: "",
            def: "",
            syn: "",
            acr: ""
        }

        this.lowestID = -1
        this.indexToId = {}

        let parentTerms = this.getItems()
        let selectTerms =[parentTerms]

        this.state = {
            formItems: [Object.assign(this.newItem)],
            editHierarchy: this.props.hierarchy,
            editIDs: this.props.IDs,
            selectTerms: selectTerms,
            parentTerms: parentTerms
        }
    }

    finishClick = () => {
        const content = {
            "-1": {
            }
        }

        this.props.bulkEditCallback(content)
    }

    addTerm = () => {
        let formItems = this.state.formItems
        let selectTerms = this.state.selectTerms
        formItems.push(Object.assign(this.newItem))
        selectTerms.push([])
        selectTerms = this.buildSelectTerms(this.state.parentTerms, selectTerms, formItems)
        this.setState({
            formItems: formItems,
            selectTerms: selectTerms
        })
    }

    removeTerm = (index) => {
        let formItems = this.state.formItems
        let selectTerms = this.state.selectTerms
        formItems.splice(index, 1)
        selectTerms.splice(index, 1)
        this.setState({
            formItems: formItems,
            selectTerms: selectTerms
        })
    }

    editTerm = (index, content) => {
        let formItems = this.state.formItems
        let ids = this.state.editIDs
        let hierarchy = this.state.editHierarchy
        let parentTerms = this.state.parentTerms
        let selectTerms = this.state.selectTerms

        if (content.id === 0 && content.pid !== -99999) {
            // This code block only runs if a new item is being created and has a parent assigned
            let id = 0
            let itemHierarchy = {}
            if (index in this.indexToId) {
                // Run this code block if the item has a temporary ID
                if (formItems[index].pid !== content.pid) {
                    // Run this code block if the parent element has changed
                    if (formItems[index].pid !== 0) {
                        // If the item is not a root level item, find its sub hierarchy, copy it to memory and delete the old location
                        id = this.indexToId[index]
                        let currID = content.pid
                        let idPath = [currID]
                        while (ids[currID].parent !== null) {
                            currID = ids[currID].parent
                            idPath.push(currID)
                        }
                        idPath.reverse()

                        itemHierarchy = this.recursiveDictGet(hierarchy[idPath[0]], idPath.slice(1), id)
                        hierarchy[idPath[0]] = this.recursiveDictDel(hierarchy[idPath[0]], idPath.slice(1), id)
                    } else {
                        // If the item is a root level, copy the sub hierarchy and delete the old location
                        itemHierarchy = hierarchy[id]
                        delete hierarchy[id]
                    }
                }
            } else {
                // If the item has not been assigned an ID yet, give it one
                id = this.lowestID--
                this.indexToId[index] = id
            }

            if (content.pid !== -99999) {
                // Runs if the parent id is not set to the default value
                if (content.pid === 0) {
                    // Insert the item as a new top level element
                    ids[id] = {parent: null, term: content.term}
                    hierarchy[id] = itemHierarchy
                } else {
                    // Insert the item as a new element under whatever the parent is set to
                    ids[id] = {parent: content.pid, term: content.term}

                    let currID = content.pid
                    let idPath = [currID]
                    while (ids[currID].parent !== null) {
                        currID = ids[currID].parent
                        idPath.push(currID)
                    }
                    idPath.reverse()

                    hierarchy[idPath[0]] = this.recursiveDictAdd(hierarchy[idPath[0]], idPath.slice(1), id, itemHierarchy)
                }
            }
        }

        // Rebuilds the parentTerms and selectTerms for all items if the id or parent item of the term has changed
        if (formItems[index].id !== content.id || formItems[index].pid !== content.pid) {
            formItems[index] = content
            parentTerms = this.getItems()
            selectTerms = this.buildSelectTerms(parentTerms, selectTerms, formItems)
        } else {
            formItems[index] = content
        }

        this.setState({
            formItems: formItems,
            editHierarchy: hierarchy,
            editIDs: ids,
            parentTerms: parentTerms,
            selectTerms: selectTerms
        })
    }

    recursiveDictAdd = (subDict, keys, itemKey, itemDict) => {
        if (keys.length === 0) {
            subDict[itemKey] = itemDict
        } else {
            subDict[keys[0]] = this.recursiveDictAdd(subDict[keys[0]], keys.slice(1), itemKey, itemDict)
        }
        return subDict
    }

    recursiveDictDel = (subDict, keys, itemKey) => {
        if (keys.length === 0) {
            delete subDict[itemKey]
        } else {
            subDict[keys[0]] = this.recursiveDictDel(subDict[keys[0]], keys.slice(1), itemKey)
        }
        return subDict
    }

    recursiveDictGet = (subDict, keys, itemKey) => {
        if (keys.length === 0) {
            return subDict[itemKey]
        } else {
            return this.recursiveDictGet(subDict[keys[0]], keys.slice(1), itemKey)
        }
    }

    getItems = () => {
        let parentTerms = []
        for (const id in this.props.hierarchy) {
            parentTerms.push(<Divider />)
            parentTerms.push(<MenuItem sx={{ pl: 2}} key={id} value={id}><b>{this.props.IDs[id].term}</b></MenuItem>)
            parentTerms = parentTerms.concat(this.getSubItems(this.props.hierarchy[id], 2))
        }
        return parentTerms
    }

    getSubItems = (hierarchy, pl) => {
        let results = []
        for (let subId in hierarchy) {
            results.push(<MenuItem sx={{ pl: pl+2}} key={subId} value={subId}>{this.props.IDs[subId].term}</MenuItem>)
            results = results.concat(this.getSubItems(hierarchy[subId], pl+2))
        }
        return results
    }

    buildSelectTerms = (parentTerms, selectTerms, formItems) => {
        for (const index in selectTerms) {
            selectTerms[index] = []
        }

        for (const term of parentTerms) {
            let selected = false
            let index = 0
            if (parseInt(term.key) > 0) {
                // Only runs if value being checked is not a new value
                // We do not want to add any new values to the selectTerms options
                for (index in formItems) {
                    if (formItems[index].id === parseInt(term.key)) {
                        selected = true
                        break
                    }
                }

                if (!selected) {
                    for (const selectIndex in selectTerms) {
                        selectTerms[selectIndex].push(term)
                    }
                } else {
                    selectTerms[index].push(term)
                }
            }
        }

        return selectTerms
    }

    render() {
        return (
            <>
                {/* Top Direction */}
                <Grid container marginY={'1rem'} paddingX={'5rem'}
                    display={'flex'} 
                    flexDirection={'row'} 
                    alignItems="center" 
                    justifyContent="space-between">

                    <h1>Dictionary Bulk Edit</h1>
                    <Button variant="contained" size="large" onClick={this.bulkClick}>Finish Editing</Button>
                </Grid>


                {/* Card Area */}
                <Stack paddingX="5rem" direction="column" sx={{justifyContent: 'space-between'}}>

                    { this.state.formItems.map((item, index) => {
                        return (
                            <FormItem
                                hierarchy={this.state.editHierarchy}
                                IDs={this.state.editIDs}
                                parentTerms={this.state.parentTerms}
                                selectTerms={this.state.selectTerms[index]}
                                content={item}
                                index={index}
                                getItems={this.getItems}
                                editCallback={this.editTerm}
                                />
                        )
                    })}

                    {/* Add new card button */}
                    <Grid
                        display={'flex'}
                        flexDirection={'row'} 
                        alignItems="center" 
                        justifyContent="center"
                        marginY="1rem">
                        <Tooltip title="Click to add new items">
                            <IconButton color='primary' size="large" onClick={this.addTerm}>
                                <AddCircleIcon sx={{transform: "scale(2)"}} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Stack>
            </>
        )
    }
}