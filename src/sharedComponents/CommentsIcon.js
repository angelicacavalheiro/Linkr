import {AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import { getWhoIFollow } from "../Service";

export default function CommentsIcon({setSeeComments, seeComments, howManyComments}){

    return(
        <div onClick={()=> setSeeComments(!seeComments)}>
        <CommentsIconStyle />
        <p>{howManyComments} comments</p>
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