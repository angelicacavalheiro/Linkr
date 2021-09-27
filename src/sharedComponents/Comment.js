import styled from "styled-components"
import { useContext, useEffect } from "react"
import UserContext from "../contexts/UserContext"
import ShowMenuContext from "../contexts/ShowMenuContext"
import { getFollowingUsers} from "../Service"
import { Link } from "react-router-dom";

export default function Comment({comment}){
    const {user} = useContext(UserContext);
    const {following, setFollowing} = useContext(ShowMenuContext);
    let isMycomment = false;
    let amIFollowing =false;

    useEffect(()=>{
        const promisse = getFollowingUsers(user.token)
        promisse.then((resp)=>{
            setFollowing(resp.data.users) 
        })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    if(comment.user.id === user.id){
        isMycomment =true;
    }
    following.map((f)=>{
        if(comment.user.id === f.id){
            amIFollowing =true;
        }
        return true;
    })

    return(
        <>
        <CommentStyled>
            <LinkStyle to={`/user/${comment.user.id}`}>
                <img src={comment.user.avatar} alt=""/>
            </LinkStyle>
            
            <div>
                <UserInfo>
                    <LinkStyle to={`/user/${comment.user.id}`}>
                        <h5>{comment.user.username}</h5>
                    </LinkStyle>
                    <span>{isMycomment?`• post’s author`:""}</span>
                    <span>{amIFollowing?"• following" : ""}</span>
                </UserInfo>
                <p>
                {comment.text}
                </p>
            </div>  
        </CommentStyled>
        <Border />
        </>
    )
}


const CommentStyled = styled.div`
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
        word-break: break-all;
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
            word-break: break-all;
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
const LinkStyle = styled(Link)`
    text-decoration: none; 
`