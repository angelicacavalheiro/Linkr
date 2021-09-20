import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getTimelinePosts, postLike, postUnlike, getLikes} from "../Service";
import ReactTooltip from 'react-tooltip';

export default function Likes ({postInfo, setPostsList}){

    const {user} = useContext(UserContext);
    //console.log(postInfo.likes[0].userId)
    
    function getLike(id){

        getLikes(user.token)
        .then(res => {  
            compareLike(id, res.data.posts)       
        })      
    }

    function compareLike(id, likeList){

        const likes = likeList.filter((l) => (l.id === id) )
        likes.length !== 0 ? (unLike(id)) : (Like(id))
    }

    function Like(id){

        postLike(user.token, id)
        .then(res => {   
            getTimelinePosts(user.token)
            .then((res)=> {
            setPostsList(res.data)
            ReactTooltip.rebuild();
            })            
        })      
    }
       
    function unLike(id){

        postUnlike(user.token, id)
        .then(res => {    
            getTimelinePosts(user.token)
            .then((res)=> {
            setPostsList(res.data)
            ReactTooltip.rebuild();
            })            
        })      
    }

    function NumberofLikes(){
        if (postInfo.likes.length === 0){
            return (null)
        } else if (postInfo.likes.length === 1) {
            return (postInfo.likes[0]["user.username"])
        } else if   (postInfo.likes.length === 2) {
            return(`${postInfo.likes[0]["user.username"]}, ${postInfo.likes[1]["user.username"]}`)
        } else if (postInfo.likes.length > 2){
            return (`${postInfo.likes[0]["user.username"]}, ${postInfo.likes[1]["user.username"]} e outras ${(postInfo.likes.length)-2} pessoas`)
        }
    }
    
    function NumberofLikesIncludesMy(){
    if (postInfo.likes.length === 0){
        return (null)
    } else if (postInfo.likes.length === 1) {
        return ("Você curtiu")
    } else if   (postInfo.likes.length === 2) {
        return (`Você e ${postInfo.likes[0]["user.username"] === user.id ? postInfo.likes[1]["user.username"] : postInfo.likes[0]["user.username"]}  curtiram`)
    } else if (postInfo.likes.length > 2){
        const likeListExcludeMy = postInfo.likes.filter((l) => (l.userId !== user.id))
        return (`Você, ${likeListExcludeMy[0]["user.username"]} e outras ${(postInfo.likes.length)-2} pessoas`)
    }
}

    return(
       <>
            {postInfo.likes.filter((l) => (l.userId === user.id)).length !== 0 ?
                <IconAiFillHeart style={{color:"#AC0000"}} 
                onClick={() => getLike(postInfo.id)} 
                data-tip={NumberofLikesIncludesMy()}/>
                :
                <IconOutlineHeart style={{color:"#ffffff"}} 
                onClick={() => getLike(postInfo.id)}
                data-tip={NumberofLikes()} />
            }
        
            <ReactTooltip />
    
            <p>{`${postInfo.likes.length} ${postInfo.likes.length > 1 ? 'likes' : 'like'}`}</p>
       </>
    )
}

const IconAiFillHeart = styled(AiFillHeart)`
    font-size: 20px;
    margin-top: 19px;
    font-weight: 700;
`; 

const IconOutlineHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    margin-top: 19px;
    font-weight: 700;
`; 