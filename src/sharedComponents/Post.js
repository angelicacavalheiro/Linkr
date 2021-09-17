import styled from "styled-components";
import { useContext, useEffect, useState } from "react"
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import { useHistory } from "react-router";
import React, { useRef } from "react";
import { TiPencil } from "react-icons/ti";
import UserContext from "../contexts/UserContext"
import { putEditPost } from "../Service";


export default function Post ({postInfo}) {
    let history = useHistory()
    const FocusHere = useRef();
    const { user } = useContext(UserContext);
    const [isMyPost , setIsMyPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [sending, setSending] = useState(false);
    const [postText, setPostText]=useState(postInfo.text)
    const [inputValue, setInputValue] = useState(postInfo.text);

    useEffect(()=>{
        setSending(false)
        if(user.id === postInfo.user.id){
                setIsMyPost(true);
            }
        if(isEditing){
            editPost();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing])
  
    function redirectToHashTag (wrongHahshTag){
        let hashTag = wrongHahshTag.substr(1);
        history.push(`/hashtag/${hashTag}`);
    }
    
    function editPost(){
        if(isEditing){
            setInputValue(postText)
        }
       FocusHere.current.focus();
        
    }
    function keyPrees(e){
        if(e.keyCode === 27){
                setIsEditing(false);
            }
        if(e.keyCode === 13){
            setSending(true)
            const body = { text : inputValue};
            const promise = putEditPost(user.token,body, postInfo.id )
            promise.then((resp)=>{
                setIsEditing(false);
                setInputValue(resp.data.post.text)
                setPostText(resp.data.post.text)

            });
            promise.catch(()=>{
                alert("Erro: Não foi possível salvar as alterações");
                setSending(false)
                FocusHere.current.focus();
            })
        }
    }


    return(
        <BlackBoxStyle >
            <PhotoAndLikeBoxStyle >
            <LinkStyle to={`/user/${postInfo.user.id}`}><img src={postInfo.user.avatar} alt={postInfo.user.username} /></LinkStyle>
                <Icon />
                <p>{`${postInfo.likes.length} ${postInfo.likes.length > 1 ? 'likes' : 'like'}`}</p>
            </PhotoAndLikeBoxStyle>
            <ContentBoxStyle>
                <DiplayFlexBox>
                    <LinkStyle to={`/user/${postInfo.user.id}`}><h3>{postInfo.user.username}</h3></LinkStyle>
                   {isMyPost? <PencilIcon onClick={()=> setIsEditing(!isEditing)}/> : ""}
                </DiplayFlexBox>
                {isEditing? <textarea type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} ref={FocusHere} onKeyUp={(e)=>keyPrees(e)} disabled={sending}></textarea> : <p><HashTagStyle onHashtagClick={val => redirectToHashTag(val)}>{postText}</HashTagStyle></p>}
                <LinkBoxStyle href={postInfo.link} target='_blank' >
                    <LinkInfoStyle>
                        <LinkTitleStyle>{postInfo.linkTitle}</LinkTitleStyle>
                        <LinkDescriptionStyle>{postInfo.linkDescription}</LinkDescriptionStyle>
                        <LinkUrlStyle>
                            {postInfo.link}
                        </LinkUrlStyle>
                    </LinkInfoStyle>
                        <img src={postInfo.linkImage} alt={"Link"}/>
                </LinkBoxStyle>
            </ContentBoxStyle>
        </BlackBoxStyle>
        
    )
}

const BlackBoxStyle = styled.div`
background-color: #171717;
width: 100%;
border-radius: 16px;
margin-top:16px;
display: flex;
    
`
const PhotoAndLikeBoxStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 90px;
text-align: center;
    img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-top: 19px;
    }
    p{
        font-size: 11px;
        margin-top: 4px;
        color: #ffffff;
        
    }
   
`
const Icon = styled(FiHeart)`
font-size: 20px;
color: #ffffff;
margin-top: 19px;
font-weight: 700;
`
const PencilIcon =styled(TiPencil)`
color: #ffffff;
font-size: 20px;
`

const ContentBoxStyle = styled.div`
display: flex;
flex-direction: column;
margin-top: 27px;
margin-bottom: 10px;
width: 500px;
    h3{
        color: #ffffff;
        font-size: 19px;
    }
    p{
        font-size: 17px;
        color: #B7B7B7;
        margin-top: 7px;
    }
    span{
        color: #ffffff;
    }
    textarea{
        background-color: #ffffff;
        height: auto;
        word-wrap: break-word;
        word-break: break-all;
        border-radius: 7px;
        padding: 7px;
        font-size: 14px;
    }
`
const LinkBoxStyle = styled.a`
display: flex;
justify-content: space-between;
margin-top:10px ;
border: 1px solid #C4C4C4;
border-radius: 11px;
border-right: none;
text-decoration: none;
word-wrap: break-word;
img{
    width: 153px;
    height: 155px;
    border-radius: 0px 13px 13px 0px;
    margin-left: 10px;
    
    @media(max-width: 600px) {
        width: 95px;
        height: 100%;

    }

}
    @media(max-width: 600px) {
        word-break: break-all;
        width: 75vw;
    }

`
const LinkInfoStyle = styled.div`
display: flex;
flex-direction: column;
border-radius: 11px;
width: 330px;
border-right: none;
padding-left: 18px;
`
const LinkTitleStyle = styled.div`
display: flex;
flex-direction: column;
color: #CECECE;
margin-top: 20px;
font-size: 16px;
line-height: 19px;

    @media(max-width: 600px) {
       font-size: 11px;
    }

`
const LinkDescriptionStyle = styled.div`
display: flex;
flex-direction: column;
font-size: 11px;
color:#9B9595;
margin-top: 5px;
line-height: 13px;

    @media(max-width: 600px) {
       font-size: 8px;
    }

`
const LinkUrlStyle = styled.h4`
display: flex;
flex-direction: column;
font-size: 11px;
line-height: 13px;
margin-top: 10px;
text-decoration: none;
color: #CECECE;
    
    @media(max-width: 600px) {
       font-size: 9px;
    }
`

const LinkStyle = styled(Link)`
    text-decoration: none; 
`
const HashTagStyle = styled(ReactHashtag)`
    cursor: 'pointer';
`
const DiplayFlexBox =styled.div`
    display: flex;
    justify-content: space-between;

`
