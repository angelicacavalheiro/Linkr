
import axios from "axios";
const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr';

const createHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } };
}
function tryDeletePost (id, token) {
    const promise = axios.delete(`${URL}/posts/${id}`, createHeaders(token))
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
	const promise = axios.post(`${URL}/posts`, body, createHeaders(token));
	return promise;
};
function getTimelinePosts (token) {
    const promise = axios.get(`${URL}/following/posts`, createHeaders(token))
    return promise;
}
function getAnUserPosts (token, id) {
    const promise = axios.get(`${URL}/users/${id}/posts`, createHeaders(token))
    return promise;
}
function getHashtagPosts (token, hashtag) {
        const promise = axios.get(`${URL}/hashtags/${hashtag}/posts`, createHeaders(token))
        return promise;
}
function getTrendingHashtags (token) {
    const promise = axios.get(`${URL}/hashtags/trending`, createHeaders(token));
    return promise
}
function putEditPost(token, body, id){
    const promise = axios.put(`${URL}/posts/${id}`, body, createHeaders(token));
	return promise;
}
function postLike (token, id) {
    const promise = axios.post(`${URL}/posts/${id}/like`, {}, createHeaders(token));    
    return promise
}
function postUnlike (token, id) {
    const promise = axios.post(`${URL}/posts/${id}/dislike`, {}, createHeaders(token));    
    return promise
}
function getLikes (token) {
    const promise = axios.get(`${URL}/posts/liked`, createHeaders(token));    
    return promise
}
function getComments(token, id){
    const promise = axios.get(`${URL}/posts/${id}/comments`, createHeaders(token));    
    return promise
}
function postComment(token, id, body){
    const promise = axios.post(`${URL}/posts/${id}/comment`,body, createHeaders(token));    
    return promise
}
function getFollowingUsers(token) {
    const promise = axios.get(`${URL}/users/follows`, createHeaders(token));
    return promise
}
function getUsers (token, usersSearch) {
    const promise = axios.get(`${URL}/users/search?username=${usersSearch}`, createHeaders(token))  
    return promise
}
function postUnfollowOrFollow(token, id, action){
    const promise = axios.post(`${URL}/users/${id}/${action}`, {} ,createHeaders(token));  
    return promise
}
function getInfoUser(token, id){
    const promise = axios.get(`${URL}/users/${id}`, createHeaders(token))
    return promise
}
function getOlderPosts (token, lastPostId) {
    const promise = axios.get(`${URL}/following/posts?olderThan=${lastPostId}`, createHeaders(token))
    return promise;
}
function getOlderMyPosts (token, id, lastPostId) {


    const promise = axios.get(`${URL}/users/${id}/posts?olderThan=${lastPostId}`, createHeaders(token))
    return promise;
}
function getOlderLikes (token, lastPostId) {
    const promise = axios.get(`${URL}/posts/liked?olderThan=${lastPostId}`, createHeaders(token))
    return promise;
}
function getOlderHashtags (token, hashtag, lastPostId) {
    const promise = axios.get(`${URL}/hashtags/${hashtag}/posts?olderThan=${lastPostId}`, createHeaders(token))
    return promise;
}
function getEarlierPosts (token, lastPostId) {
    const promise = axios.get(`${URL}/following/posts?earlierThan=${lastPostId}`, createHeaders(token))
    return promise;
}

function postRepost(token, id){
    const promise = axios.post(`${URL}/posts/${id}/share`, {}, createHeaders(token));
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
    getOlderPosts,
    getOlderMyPosts,
    getOlderLikes,
    getOlderHashtags,
    getComments,
    postComment,
    getFollowingUsers,
    getUsers,
    postUnfollowOrFollow,
    getInfoUser,
    getEarlierPosts,
    postRepost
}