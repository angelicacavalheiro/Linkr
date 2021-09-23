import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { postLike, postUnlike, getLikes} from "../Service";
import ReactTooltip from 'react-tooltip';

export default function Likes ({postInfo}){

    const {user} = useContext(UserContext);
    const [like, setLike] = useState(postInfo.likes)
    
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
            setLike(res.data.post.likes)
            ReactTooltip.rebuild();  
        }) 
    } 
       
    function unLike(id){

        postUnlike(user.token, id)
        .then(res => {    
            setLike(res.data.post.likes)    
            ReactTooltip.rebuild();                             
        })   
    }       

    function NumberofLikes(){
        let userName = "";

        if (like[0] !== undefined){
            userName = like[0]["user.username"] !== undefined ? "user.username" : "username";
        }

        if (like.length === 0){
            return (null)
        } else if (like.length === 1) {
            return (like[0][userName])
        } else if   (like.length === 2) {            
            return(`${like[0][userName]}, ${like[1][userName]}`)
        } else if (like.length > 2){
            return (`${like[0][userName]}, ${like[1][userName]} e outras ${(like.length)-2} pessoas`)
        }
    }
    
    function NumberofLikesIncludesMy(){

        let userName = "";

        if (like[0] !== undefined){
            userName = like[0]["user.username"] !== undefined ? "user.username" : "username";
        }

        if (like.length === 0){
            return (null)
        } else if (like.length === 1) {
            return ("Você curtiu")
        } else if   (like.length === 2) {
            return (`Você e ${like[0][userName] === user.id ? like[1][userName] : like[0][userName]}  curtiram`)
        } else if (like.length > 2){
            const likeListExcludeMy = like.filter((l) => (l.userId !== user.id))
            return (`Você, ${likeListExcludeMy[0][userName]} e outras ${(like.length)-2} pessoas`)
        }
    }

    return(
       <>
            {like.filter((l) => (l.userId === user.id)).length !== 0 ?
                <IconAiFillHeart style={{color:"#AC0000"}} 
                onClick={() => getLike(postInfo.id)} 
                data-tip={NumberofLikesIncludesMy()}/>
                :
                <IconOutlineHeart style={{color:"#ffffff"}} 
                onClick={() => getLike(postInfo.id)}
                data-tip={NumberofLikes()} />
            }
        
            <ReactTooltip />
    
            <p>{`${like.length} ${like.length > 1 ? 'likes' : 'like'}`}</p>
       </>
    )
}

const IconAiFillHeart = styled(AiFillHeart)`
    font-size: 20px;
    margin-top: 19px;
    font-weight: 700;
    outline: 0;
`; 

const IconOutlineHeart = styled(AiOutlineHeart)`
    font-size: 20px;
    margin-top: 19px;
    font-weight: 700;
    outline: 0;
`; 