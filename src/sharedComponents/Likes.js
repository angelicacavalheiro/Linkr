import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import axios from "axios";

export default function Likes ({postInfo}){

    const {user} = useContext(UserContext);

    //let isLike = (like !== undefined && like === "red") ? "red" : "#ffffff";
    //const [like, setLike] = useState("fffff");

    function Like(id){
        //console.log(id)

        //setLike("red")

        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${id}/like`, {}, config)
        .then(res => {
            console.log("deu like")
            console.log(res.data)
            })    
    }
   
    // function unLike(id){

    //     setLike("#ffffff")  
       
    //     const config = {
    //         headers:{
    //             Authorization: `Bearer ${user.token}`
    //         }
    //     }

    //     axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${id}/dislike`, {}, config)
    //     .then(res => {
    //             const config = {
    //             headers:{
    //                 Authorization: `Bearer ${user.token}`
    //             }
    //         }
    
    //         axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/liked', config)
    //         .then(res => {
            
    //         })            
    //     })      
    // }  




    return(
       <>

        {/* {(habito.done === true) ?
        <Icon onClick={() => Like()} />                   
        : 
        <Icon onClick={() => unLike()} /> 
        } */}

        <Icon onClick={() => Like(postInfo.id)}/>
        <p>{`${postInfo.likes.length} ${postInfo.likes.length > 1 ? 'likes' : 'like'}`}</p>
       </>
    )
}

const Icon = styled(FiHeart)`
font-size: 20px;
color: #ffffff;
margin-top: 19px;
font-weight: 700;
`