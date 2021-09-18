import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getTimelinePosts, postLike, postUnlike, getLikes} from "../Service";
import ReactTooltip from 'react-tooltip';

export default function Likes ({postInfo, setPostsList}){

    const {user} = useContext(UserContext);
    console.log(postInfo)
    
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
            return ("nada")
        } else if (postInfo.likes.length === 1) {
            return (postInfo.likes[0].userId)
        } else if   (postInfo.likes.length === 2) {
            return(`${postInfo.likes[0].userId}, ${postInfo.likes[1].userId}`)
        } else if (postInfo.likes.length > 2){
            return (`${postInfo.likes[0].userId}, ${postInfo.likes[1].userId} e outras ${(postInfo.likes.length)-2} pessoas`)
        }
    }

    // function NumberofN(){
    //     if (postInfo.likes.length === 0){
    //         return ("nada")
    //     } else if (postInfo.likes.length === 1) {
    //         return (postInfo.likes[0].userId)
    //     } else if   (postInfo.likes.length === 2) {
    //         return(`Você e ${postInfo.likes[1].userId} curtiram`)
    //     } else if (postInfo.likes.length > 2){
    //         return (`Você, ${postInfo.likes[1].userId} e outras ${(postInfo.likes.length)-2} pessoas`)
    //     }
    // }
    
   
    return(
       <>
            {postInfo.likes.filter((l) => (l.userId === user.id)).length !== 0 ?
                <IconAiFillHeart style={{color:"#AC0000"}} 
                onClick={() => getLike(postInfo.id)} 
                data-tip data-for="ifYouLike"/>
                :
                <IconOutlineHeart style={{color:"#ffffff"}} 
                onClick={() => getLike(postInfo.id)}
                data-tip />
            }
            <ReactTooltip id="ifYouLike" place="top" effect="solid">
                curtiu
            </ReactTooltip>

            <ReactTooltip place="top" effect="solid">
                {NumberofLikes()}
            </ReactTooltip>
    
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