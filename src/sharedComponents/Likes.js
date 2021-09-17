import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getTimelinePosts, postLike, postUnlike, getLikes} from "../Service";

export default function Likes ({postInfo, setPostsList}){

    const {user} = useContext(UserContext);


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
            })            
        })      
    }
   
    function unLike(id){

        postUnlike(user.token, id)
        .then(res => {    
            getTimelinePosts(user.token)
            .then((res)=> {
            setPostsList(res.data)
            })            
        })      
    }
   
    return(
       <>
       {postInfo.likes.filter((l) => (l.userId === user.id)).length !== 0 ?
            <IconAiFillHeart style={{color:"#AC0000"}} onClick={() => getLike(postInfo.id)} />
            :
            <IconOutlineHeart style={{color:"#ffffff"}} onClick={() => getLike(postInfo.id)} />
       }

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