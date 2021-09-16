import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import axios from "axios";

export default function Likes ({postInfo}){

    console.log(postInfo)
    const {user} = useContext(UserContext);

    let isLike = (like !== undefined && like === "red") ? "red" : "#ffffff";
    const [like, setLike] = useState(isLike);


    function Like(){

        setLike("red")
        let id = (postInfo.id)

        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${id}/like`, {}, config)
        .then(res => {

            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }
    
            axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/liked', config)
            .then(res => {
                console.log("deu like")
            })       

        })    
    }
   
    function unLike(){

        setLike("#ffffff")
        let id = (postInfo.id)    
       
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/${id}/dislike`, {}, config)
        .then(res => {
                const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }
    
            axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/posts/liked', config)
            .then(res => {
            
            })            
        })      
    }  




    return(
       <>

        {/* {(habito.done === true) ?
        <Icon onClick={() => Like()} />                   
        : 
        <Icon onClick={() => unLike()} /> 
        } */}

        <Icon />
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