import React from 'react'
import {Button, Grid, IconButton, MenuItem, Stack, Tooltip} from '@mui/material'
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
        this.newTerms = true
        
        let parentTerms = this.getItems(this.props.hierarchy, this.props.IDs)

        this.state = {
            formItems: [Object.assign(this.newItem)],
            editHierarchy: JSON.parse(JSON.stringify(this.props.hierarchy)),
            editIDs: JSON.parse(JSON.stringify(this.props.IDs)),
            selectTerms: parentTerms,
            parentTerms: parentTerms
        }
    }

    finishEditing = () => {
        let content = {}
        this.state.formItems.forEach((item, index) => {
            let id = item.id
            if (id === 0) {
                id = this.indexToId[index]
            }

            const syn = item.syn.trim().replace(/  +/gm, " ").replace(/ ?[\r\n]+ ?/gm, ";")
            const uniqueSyns = [...new Set(syn.split(";"))].join(";")
            const acr = item.acr.trim().replace(/  +/gm, " ").replace(/ ?[\r\n]+ ?/gm, ";")
            const uniqueAcrs = [...new Set(acr.split(";"))].join(";")

            content[id] = {
                id: id,
                parent_id: item.pid,
                term: item.term,
                definition: item.def.trim().replace(/  +/gm, " ").replace(/ ?([\r\n]+) ?/gm, "$1").replace(/[\r\n]{2,}/gm, "\n\n"),
                synonyms: uniqueSyns,
                acronyms: uniqueAcrs
            }
        })

        this.props.bulkEditCallback(content)
    }

    addTerm = () => {
        let formItems = this.state.formItems
        formItems.push(Object.assign(this.newItem))
        this.setState({
            formItems: formItems,
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
        this.newTerms = false

        if (content.id === 0 && content.pid !== -99999) {
            // This code block only runs if a new item is being created and has a parent assigned
            let id = 0
            let itemHierarchy = {}
            if (index in this.indexToId) {
                id = this.indexToId[index]
                
                // Update the term in the ids list
                ids[id] = {parent: ids[id].parent, term: content.term}

                // Run this code block if the item has a temporary ID
                if (formItems[index].pid !== content.pid) {
                    // Run this code block if the parent element has changed

                    // This whole code block removes the element from its orginal place in the hierarchy
                    if (formItems[index].pid !== 0) {
                        // If the item is not a root level item, find its sub hierarchy, copy it to memory and delete the old location
                        let currID = formItems[index].pid
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

                    // The item is then to be reinserted into the hierarhcy
                    if (content.pid === 0) {
                        // Insert the item as a new top level element
                        ids[id] = {parent: null, term: content.term}
                        hierarchy[id] = itemHierarchy
                    } else {
                        // Insert the item as a new element under whatever the parent is set to
                        ids[id] = {parent: content.pid, term: content.term}
        
                        hierarchy = this.insertIntoHierarchy(hierarchy, id, content.pid, itemHierarchy)
                    }
                }
            } else {
                // If the item has not been assigned an ID yet, give it one
                id = this.lowestID--
                this.indexToId[index] = id

                // If the item is just getting an ID, it needs to be inserted into the hierarchy
                if (content.pid === 0) {
                    // Insert the item as a new top level element
                    ids[id] = {parent: null, term: content.term}
                    hierarchy[id] = itemHierarchy
                } else {
                    // Insert the item as a new element under whatever the parent is set to
                    ids[id] = {parent: content.pid, term: content.term}
                    hierarchy = this.insertIntoHierarchy(hierarchy, id, content.pid, itemHierarchy)
                }
            }
        }

        // Rebuilds the parentTerms and selectTerms for all items if the id of any term or parent item of a new term has changed
        if (((formItems[index].id > 0 || content.id > 0) && formItems[index].id !== content.id) ||
            ((formItems[index].id === 0 || content.id === 0) && ((formItems[index].pid !== content.pid && content.term) || formItems[index].term !== content.term))) {
            this.newTerms = true
            formItems[index] = content
            parentTerms = this.getItems(hierarchy, ids)
            selectTerms = this.buildSelectTerms(parentTerms, formItems)
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

    getItems = (hierarchy, IDs) => {
        let parentTerms = []
        for (const id in hierarchy) {
            parentTerms.push(<MenuItem sx={{ pl: 2}} key={id} value={id}><b>{IDs[id].term}</b></MenuItem>)
            parentTerms = parentTerms.concat(this.getSubItems(hierarchy[id], IDs, 2))
        }
        return parentTerms
    }

    getSubItems = (hierarchy, IDs, pl) => {
        let results = []
        for (const subId in hierarchy) {
            results.push(<MenuItem sx={{ pl: pl+2}} key={subId} value={subId}>{IDs[subId].term}</MenuItem>)
            results = results.concat(this.getSubItems(hierarchy[subId], IDs, pl+2))
        }
        return results
    }

    buildSelectTerms = (parentTerms, formItems) => {
        let selectTerms = []
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
                    selectTerms.push(term)
                } else {
                    selectTerms.push(React.cloneElement(term, {disabled: true}))
                }
            }
        }

        return selectTerms
    }

    insertIntoHierarchy = (hierarchy, id, pid, itemHierarchy) => {
        // Inserts the item as a new element under whatever the parent is set to
        let currID = pid
        let idPath = [currID]
        while (this.state.editIDs[currID].parent !== null) {
            currID = this.state.editIDs[currID].parent
            idPath.push(currID)
        }
        idPath.reverse()
        hierarchy[idPath[0]] = this.recursiveDictAdd(hierarchy[idPath[0]], idPath.slice(1), id, itemHierarchy)
        return hierarchy
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
                    <Button variant="contained" size="large" onClick={this.finishEditing}>Finish Editing</Button>
                </Grid>


                {/* Card Area */}
                <Stack paddingX="5rem" direction="column" sx={{justifyContent: 'space-between'}}>

                    { this.state.formItems.map((item, index) => (
                        <FormItem
                            key={index}
                            index={index}
                            content={item}
                            indexToId={this.indexToId}
                            hierarchy={this.state.editHierarchy}
                            IDs={this.state.editIDs}
                            newTerms={this.newTerms}
                            parentTerms={this.state.parentTerms}
                            selectTerms={this.state.selectTerms}
                            editCallback={this.editTerm}
                            />
                    ))}

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