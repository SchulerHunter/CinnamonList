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
        const {data:response} = await axios.post('http://127.0.0.1:5000/getIDs', axiosData, axiosConfig)
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
    var config = axiosConfig
    config.headers["content-type"] = "application/json"
    try {
        const {data:response} = await axios.post(`http://127.0.0.1:5000/search`, {searchKey:key}, config)
        return response
    }

    catch (error) {
        console.log(error)
    }
}

export async function editTerm(key, content) {
    var config = axiosConfig
    config.headers["content-type"] = "application/json"
    try {
        const {data:response} = await axios.post(`http://127.0.0.1:5000/edit/${key}`, {content: content}, config)
        return response
    }

    catch (error) {
        console.log(error)
    }
}

export async function bulkEdit(content) {
    var config = axiosConfig
    config.headers["content-type"] = "application/json"
    try {
        const {data:response} = await axios.post(`http://127.0.0.1:5000/bulk`, {content: content}, config)
        return response
    }

    catch (error) {
        console.log(error)
    }
}