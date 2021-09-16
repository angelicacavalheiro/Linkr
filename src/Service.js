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
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.get(`${URL}/posts`, config)
    return promise
}

function getAnUserPosts (token, id) {
console.log(token, id)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    }

    const promise = axios.get(`${URL}/users/${id}/posts`, config)
    return promise;
}

function getHashtagPosts (token, hashtag) {
    console.log(token, hashtag)
        const config = {
            headers: {
                "Authorization": `Bearer ${token}` 
            }
        }
    
        const promise = axios.get(`${URL}/hashtags/${hashtag}/posts`, config)
        return promise;
    }


export {
    getTimelinePosts,
    getAnUserPosts,
    getHashtagPosts,
    postSignUp, 
    postLogin

}