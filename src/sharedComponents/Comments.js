import styled from "styled-components"
import { useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function Comments({comment}){
    // const {id, text, user} = props.comment;
    const {user} = useContext(UserContext);
    let isMycomment = false
    
    if(comment.user.id === user.id){
        isMycomment =true;
    }
    return(
        <>
        <Comment>
            <img src={comment.user.avatar} alt=""/>
            <div>
                <UserInfo>
                    <h5>{comment.user.username}</h5>
                    <span>{isMycomment?`• post’s author`:`• following`}</span>
                </UserInfo>
                <p>
                {comment.text}
                </p>
            </div>  
        </Comment>
        <Border />
        </>
    )
}


const Comment = styled.div`
    width: 100%;
    height: auto;
    color: #ffffff;
    margin-top: 10px;
    display: flex;

    img{
        height: 40px;
        width: 40px;
        border-radius: 100%;
        margin-right: 15px;
        margin-left: 20px;
    }
    p{
        color: #ACACAC;
        font-size: 14px;
        margin-right: 13px;
    }
   
`
const UserInfo = styled.div`
    display: flex;
    font-size: 14px;
    width: auto;
    height: auto;
    margin-bottom: 10px;

        h5{
            color: #F3F3F3;
            font-weight: 700;
        }
        span{
            color: #565656;
            margin-left: 7px;
        }

`
const Border =styled.div`
    height: 1px;
    width: 95%;
    background-color: #353535;
    margin-top: 15px;
    margin-bottom: 15px;


`