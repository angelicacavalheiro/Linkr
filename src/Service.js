import axios from "axios";
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr'

function tryDeletePost (id, token) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.delete(`${URL}/${id}`, token)
    return promise
}

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
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.get(`${URL}/posts`, config)
    return promise
}

export {
    getTimelinePosts,
    postSignUp, 
    postLogin,
    tryDeletePost
}