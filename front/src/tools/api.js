
import axios from 'axios'
const urlAPI = "http://localhost:1234/"

const request = (url, type, data) => {
    let options = {
        method: type,
        url: urlAPI + url
    }
    if (type === "POST") {
        options.data = data
    }
    return axios(options)
}

const authRequest = (token, url, type, data) => {
    let options = {
        method: type,
        url: urlAPI + url,
        headers: {'Authorization': 'bearer ' + token}
    }
    if (type === "POST") {
        options.data = data
    }
    return axios(options) 
}

export { request, authRequest }