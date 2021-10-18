import React from 'react'
import {Grid, Card, CardContent, TextField, Stack} from '@mui/material'
import {useState, useEffect} from 'react'

export default function Listi(props){
    const [cur, setCur] = useState(props.data['start'])
    const [title, setTitle] = useState("start")

    let goback = () => {
        if(props.data[title]['parent'] == undefined){
            console.log("we could not go back")
        }else{
            setTitle(props.data[title]['parent'])
            setCur(props.data[props.data[title]['parent']])
        }
    }

    return(
        <Card>
            <CardContent>
                <TextField fullWidth id="outlined-basic" label="Search" variant="outlined" />
                <button onClick={goback}><h3>&lt; {title}</h3></button>
                <Stack>
                    {cur["children"].map(child => (<Bar title={child} setTitle={setTitle} setCur={setCur} setCurrent={props.setCurrent} data={props.data}/>))}
                </Stack>
            </CardContent>
        </Card>
    )
}

function Bar(props){
    let check = () => {
        console.log("check works")
        if (props.data[props.title]["children"] == undefined){
            console.log("change data displayed")
            props.setCurrent(props.data[props.title]['data'])
        }else{
            console.log(props.data[props.title])
            props.setTitle(props.title)
            props.setCur(props.data[props.title])
        }
    }
    return(
        <div onClick={check}>{props.title} {props.data[props.title]['children'] == undefined ? "" : '>'}</div>
    )
}