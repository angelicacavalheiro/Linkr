import {AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentsIcon({setSeeComments, seeComments}){

    return(
        <div onClick={()=> setSeeComments(!seeComments)}>
        <CommentsIconStyle />
        <p>0 comments</p>
        </div>
    )
}

const CommentsIconStyle =styled(AiOutlineComment)`
color: #ffffff;
font-size: 20px;
margin-top: 10px;

:hover{
    cursor: pointer;
    filter: brightness(0.7);
}
`