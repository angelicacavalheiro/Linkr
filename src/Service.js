
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

    const promise = axios.get(`${URL}/following/posts`, config)
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

function putEditPost(token, body, id){
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.put(`${URL}/posts/${id}`, body, config);
	return promise;
}

function postLike (token, id) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.post(`${URL}/posts/${id}/like`, {}, config);    
    return promise

}

function postUnlike (token, id) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.post(`${URL}/posts/${id}/dislike`, {}, config);    
    return promise

}

function getLikes (token) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.get(`${URL}/posts/liked`, config);    
    return promise

}

function getFollowingUsers(token) {
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const promise = axios.get(`${URL}/users/follows`, config);
    return promise
}

function getOlderPosts (token, lastPostId) {

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.get(`${URL}/following/posts?olderThan=${lastPostId}`, config)
    return promise;
}

export {
    getTimelinePosts,
    getAnUserPosts,
    getHashtagPosts,
    postSignUp, 
    postLogin,
    tryDeletePost,
    postUserPost,
    getTrendingHashtags,
    putEditPost,
    postLike,
    postUnlike,
    getLikes,
    getFollowingUsers,
    getOlderPosts
}