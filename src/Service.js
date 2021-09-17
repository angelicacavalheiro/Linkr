import axios from "axios";
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr'

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
    console.log(token, body)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.put(`${URL}/posts/${id}`, body, config);
	return promise;
}

export {
    getTimelinePosts,
    postSignUp, 
    postLogin,
    postUserPost,
    getTrendingHashtags,
    putEditPost
}