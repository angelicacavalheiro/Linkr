import styled from "styled-components";
import {FiSend } from "react-icons/fi";
import {postComment} from "../Service"
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function SendComment({id}){
    const [isSending, setIsSending] = useState(false);
    const [inputComment, setInputComment]= useState("");
    const {user} = useContext(UserContext)

    function keyPrees(e){
        if(e.keyCode === 13){
            sendingComment();
        }
    }
    function sendingComment(){
        if(inputComment.length !== 0){
            setIsSending(true)
        let body ={
                text: inputComment
            }

            const promise = postComment(user.token , id, body);
            promise.then(()=> {
                setIsSending(false)
                setInputComment("");
            })
        }
    }

    return(
        <>
         <img src={user.image} alt="" />
         <input placeholder="write a comment..." 
                value={inputComment} 
                onChange={(e)=> setInputComment(e.target.value)} 
                onKeyUp={(e)=>keyPrees(e)} 
                disabled={isSending}>

        </input>
         <IconStyle onClick={sendingComment}/>
        </>
    )
}

const IconStyle = styled(FiSend)`
    color: #F3F3F3;
    height: 40px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #252525;
    width: 30px;
    padding-right: 13px;
    font-size: 20px;

`