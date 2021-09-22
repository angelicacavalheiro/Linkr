import styled from "styled-components";
import {FiSend } from "react-icons/fi";
import {postComment} from "../Service"
import { useState } from "react";

export default function SendComment({setInputComment, inputComment, user, id, setComments, comments}){
    const [isSending, setIsSending] = useState(false);

    function keyPrees(e){
        if(e.keyCode === 13){
            sendingComment();
        }
    }
    function sendingComment(){
        setIsSending(true)
       let body ={
            text: inputComment
        }

        const promise = postComment(user.token , id, body);
        promise.then((resp)=> {
            console.log(resp.data)
            setIsSending(false)
            const newcomment = {
                id: resp.data.comment.postId,
                text: resp.data.comment.text,
                user: {
                    id: user.id,
                    username: user.username,
                    avatar: user.image
                } 
            }
            setComments([...comments,newcomment])
            setInputComment("");
        })
    }

    return(
        <>
         <img src={user.image} alt="" />
         <input placeholder="write a comment..." value={inputComment} onChange={(e)=> setInputComment(e.target.value)} onKeyUp={(e)=>keyPrees(e)} disabled={isSending}></input>
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