import React from 'react'
import {ListItemText, MenuList, MenuItem, Popper, Paper, TextField} from '@mui/material'

import {searchKey} from '../utility/apiConnection'


export default class SearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.typingTimer = null
        this.state = {
            searchValue: "",
            anchorEl: null,
            showResults: false,
            hasResults: false,
            results: {}
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextState.searchValue !== this.state.searchValue || nextState.results !== this.state.results || nextState.showResults !== this.state.showResults
    }

    componentDidUpdate = (prevProps, prevState) => {
        clearTimeout(this.typingTimer)
        if (this.state.searchValue && this.state.searchValue !== prevState.searchValue) {
            this.typingTimer = setTimeout(this.doneTyping, 1000)
        }
    }

    changeHandler = (event) => {
        const newString = event.target.value
        this.setState({
            searchValue: newString,
            showResults: false,
            hasResults: false,
            results: {}
        })
    }

    doneTyping = () => {
        searchKey(this.state.searchValue).then((result) => {
            var hasResults = false
            Object.values(result).forEach(matches => {
                if (matches.length > 0) {
                    hasResults = true
                }
            })

            if (hasResults) {
                this.setState({
                    showResults: true,
                    hasResults: true,
                    results: result
                })
            } else {
                this.setState({
                    showResults: true,
                    hasResults: false,
                    results: {}
                })
            }
            
        })
    }

    searchClick = (event) => {
        const target = event.currentTarget
        this.setState({
            anchorEl: target,
            showResults: false
        })
    }

    blurHandler = () => {
        this.setState({
            showResults: false
        })
    }

    resultClick = (id) => {
        this.setState({
            searchValue: "",
            showResults: false,
            hasResults: false,
            results: {}
        })
        this.props.dataCallback(id)
    }

    render() {
        return (
            <div>
                <TextField
                    style={{ width: '25rem'}}
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    onChange={this.changeHandler}
                    onClick={this.searchClick}
                    onBlur={this.blurHandler}
                    value={this.state.searchValue}
                />
                <Popper
                    open={this.state.showResults}
                    anchorEl={this.state.anchorEl}
                    placement="bottom-start"
                    disablePortal
                    >
                    <Paper style={{maxHeight: '75vh', width: "25rem", overflowY: "auto", overflowX: "hidden"}}>
                        <MenuList id="composition-menu">
                            {this.state.hasResults &&
                                Object.keys(this.state.results).reverse().map((matches) => (
                                    this.state.results[matches].map((result) => (
                                        <MenuItem key={result[0]} value={result[0]} onClick={() => {this.resultClick(String(result[0]))}}>
                                            <ListItemText>{result[1]}</ListItemText>
                                        </MenuItem>
                                    ))
                                ))
                            }
                            {!this.state.hasResults &&
                                <MenuItem disabled>
                                    <ListItemText>No results found</ListItemText>
                                </MenuItem>
                            }
                        </MenuList>
                    </Paper>
                </Popper>
            </div>
        )
    }
}