import axios from "axios";
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr'

function postSignUp (body){
    const promise = axios.post(`${URL}/sign-up`, body);
    return promise;
}

function postLogin (body){
    const promise = axios.post(`${URL}/sign-in`, body);
    return promise;
}


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
    getTimelinePosts,
    postSignUp, 
    postLogin
}