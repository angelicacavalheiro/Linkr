import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { getTimelinePosts, postLike, postUnlike, getLikes} from "../Service";

export default function Likes ({postInfo, setPostsList}){

    const {user} = useContext(UserContext);

    //let isLike = (like !== undefined && like === "red") ? "red" : "#ffffff";
    const [like, setLike] = useState();

    function getLike(id){

        getLikes(user.token)
        .then(res => {
            console.log(res.data)  
            setLike(res.data.posts)  
            compareLike(id, res.data.posts)       
        })      
    }
    console.log(like)

    function compareLike(id, likeList){

        const likes = likeList.filter((l) => (l.id === id) )
        likes.length !== 0 ? (unLike(id)) : (Like(id))
        console.log(likes)
    }

    function Like(id){

        console.log("entrou no like")

        postLike(user.token, id)
        .then(res => {
            setLike("deu like")
            console.log(res.data)
    
            getTimelinePosts(user.token)
            .then((res)=> {
            setPostsList(res.data)
            })            
        })      
    }
   
    function unLike(id){

        console.log("entrou no unlike")

        postUnlike(user.token, id)
        .then(res => {
            console.log("deu unlike")
            console.log(res.data)
    
            getTimelinePosts(user.token)
            .then((res)=> {
            setPostsList(res.data)
            })            
        })      
    }
     

    //    {(habito.done === true) ?
    //     <Icon onClick={() => Like()} />                   
    //     : 
    //     <Icon onClick={() => unLike()} /> 
    //     } 


    return(
       <>
        <Icon onClick={() => getLike(postInfo.id)} />
        <p>{`${postInfo.likes.length} ${postInfo.likes.length > 1 ? 'likes' : 'like'}`}</p>
       </>
    )
}

const Icon = styled(FiHeart)`
    font-size: 20px;
    color: #ffffff;
    margin-top: 19px;
    font-weight: 700;
`; 