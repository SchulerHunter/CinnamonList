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
            results: {}
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return nextState.searchValue !== this.state.searchValue || nextState.results !== this.state.results
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
            results: {}
        })
    }

    doneTyping = () => {
        searchKey(this.state.searchValue).then((result) => {
            this.setState({
                showResults: true,
                results: result
            })
        })
    }

    searchClick = (event) => {
        const target = event.currentTarget
        console.log(target)
        this.setState({
            anchorEl: target,
            showResults: false
        })
    }

    resultClick = (id) => {
        this.setState({
            searchValue: "",
            showResults: false,
            results: {}
        })
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
                    value={this.state.searchValue}
                />
                {Object.keys(this.state.results).length > 0 &&
                    <Popper
                        open={this.state.showResults}
                        anchorEl={this.state.anchorEl}
                        placement="bottom-start"
                        disablePortal
                        >
                        <Paper style={{maxHeight: '75vh', overflowY: "scroll"}}>
                            <MenuList id="composition-menu">
                                {Object.keys(this.state.results).reverse().map((matches) => (
                                    this.state.results[matches].map((result) => (
                                        <MenuItem key={result[0]} value={result[0]} onClick={() => {this.resultClick(result[0])}}>
                                            <ListItemText>{result[1]}</ListItemText>
                                        </MenuItem>
                                    ))
                                ))}
                            </MenuList>
                        </Paper>
                    </Popper>
                }
            </div>
        )
    }
}