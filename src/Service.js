import axios from "axios";
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr'

function getTimelinePosts (token) {

    const config = {
        headers: {
            "Authorization": "Bearer token_recebido"
        }
    }

    const promise = axios.get(`${URL}/posts`, config)
    return promise
}


export {
    getTimelinePosts
}