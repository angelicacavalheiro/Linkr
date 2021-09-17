import axios from "axios";
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr'

function tryDeletePost (id, token) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.delete(`${URL}/posts/${id}`, config)
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

function postUserPost (body, token){
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	const promise = axios.post(`${URL}/posts`, body, config);
	return promise;
};

function getTimelinePosts (token) {

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.get(`${URL}/posts`, config)
    return promise;
}

function getAnUserPosts (token, id) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    }

    const promise = axios.get(`${URL}/users/${id}/posts`, config)
    return promise;
}

function getHashtagPosts (token, hashtag) {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}` 
            }
        }
    
        const promise = axios.get(`${URL}/hashtags/${hashtag}/posts`, config)
        return promise;
    }


function getTrendingHashtags (token) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.get(`${URL}/hashtags/trending`, config);
    return promise

}

export {
    getTimelinePosts,
    getAnUserPosts,
    getHashtagPosts,
    postSignUp, 
    postLogin,
    tryDeletePost,
    postUserPost,
    getTrendingHashtags
}