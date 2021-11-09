import axios from 'axios'

const axiosConfig = {
    headers: {'Access-Control-Allow-Origin': '*'}
}

const axiosData = {}

export async function getHierarchy() {
    try {
        const {data:response} = await axios.post('http://127.0.0.1:5000/getHierarchy', axiosData, axiosConfig)
        return response
    }

    catch (error) {
        console.log(error)
    }
}

export async function getIDs() {
    try {
        const {data:response} = await axios.post('http://127.0.0.1:5000/geIDs', axiosData, axiosConfig)
        return response
    }

    catch (error) {
        console.log(error)
    }
}

export async function getTabs() {
    try {
        const {data:response} = await axios.post('http://127.0.0.1:5000/getTabs', axiosData, axiosConfig)
        return response
    }

    catch (error) {
        console.log(error)
    }
}

export async function getItem(key) {
    try {
        const {data:response} = await axios.post(`http://127.0.0.1:5000/${key}`, axiosData, axiosConfig)
        return response
    }

    catch (error) {
        console.log(error)
    }
}

export async function searchKey(key) {
    try {
        const {data:response} = await axios.post(`http://127.0.0.1:5000/search/${key}`, axiosData, axiosConfig)
        return response
    }

    catch (error) {
        console.log(error)
    }
}