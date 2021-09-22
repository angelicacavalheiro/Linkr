import styled from "styled-components";
import ReactHashtag from "react-hashtag";
import { useHistory } from "react-router";
import Likes from "./Likes"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Trash from "./Trash";
import UserContext from "../contexts/UserContext";
import React, { useRef} from "react";
import { TiPencil } from "react-icons/ti";
import { putEditPost } from "../Service";
import CommentsIcon from "./CommentsIcon";
import Comments from "./Comments";
import Iframe from "./Iframe";
import YoutubeVideo from "./YoutubeVideo";
import { getComments } from "../Service";

export default function Post ({postInfo, setPostsList, renderPage}) {
    let history = useHistory()
    const focusHere = useRef();
    const { user } = useContext(UserContext);
    const [isMyPost , setIsMyPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [sending, setSending] = useState(false);
    const [postText, setPostText]=useState(postInfo.text)
    const [inputValue, setInputValue] = useState(postInfo.text);
    const [seeComments, setSeeComments] = useState(false)
    const [displayIframe, setDisplayIframe] = useState(false);
    const [isYoutubeVideo, setIsYoutubeVideo] = useState(false);
    const [comments, setComments] =useState({})
    const [noComments, setNoComments] = useState(true)

    useEffect(()=>{
        setSending(false)
        if(user.id === postInfo.user.id){
                setIsMyPost(true);
            }
        if(isEditing){
            editPost();
        }
       checkYoutubeVideo()
      const promise = getComments(user.token, postInfo.id)
      promise.then((resp)=>{
          setComments(resp.data.comments)
          if(resp.data.comments.lenght !== 0){
              setNoComments(false)
          }
      })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing])

    function checkYoutubeVideo(){
        let v = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (postInfo.link.match(v)){
            setIsYoutubeVideo(true)
        }
    }
  
    function redirectToHashTag (wrongHahshTag){
        let hashTag = wrongHahshTag.substr(1);
        history.push(`/hashtag/${hashTag}`);
    }
    
    function editPost(){
        if(isEditing){
            setInputValue(postText)
        }
       focusHere.current.focus();
        
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
                focusHere.current.focus();
            })
        }
    }

    return(
        <CommentContainerStyle>
        <BlackBoxStyle >
            <PhotoAndLikeBoxStyle >
            <LinkStyle to={`/user/${postInfo.user.id}`}><img src={postInfo.user.avatar} alt={postInfo.user.username} /></LinkStyle>
            <Likes postInfo={postInfo} renderPage={renderPage} />
            <CommentsIcon seeComments={seeComments} setSeeComments={setSeeComments}/>
            </PhotoAndLikeBoxStyle>
            <ContentBoxStyle>
                <DiplayFlexBox>
                    <LinkStyle to={`/user/${postInfo.user.id}`}><h3>{postInfo.user.username}</h3></LinkStyle>
                   {isMyPost? 
                   <TrashAndEditStyle>
                   <PencilIcon onClick={()=> setIsEditing(!isEditing)}/> 
                   <Trash postInfo={postInfo} renderPage={renderPage}></Trash>
                    </TrashAndEditStyle>
                   : ""}
                </DiplayFlexBox>
                {isEditing? <textarea type="text" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} ref={focusHere} onKeyUp={(e)=>keyPrees(e)} disabled={sending}></textarea> : <p><HashTagStyle onHashtagClick={val => redirectToHashTag(val)}>{postText}</HashTagStyle></p>}
                <Iframe displayIframe={displayIframe} postInfo={postInfo} setDisplayIframe={setDisplayIframe}></Iframe>
                {isYoutubeVideo? <YoutubeVideo link={postInfo.link}/> : <LinkBoxStyle onClick={()=> setDisplayIframe(true)}>
                    <LinkInfoStyle>
                        <LinkTitleStyle>{postInfo.linkTitle}</LinkTitleStyle>
                        <LinkDescriptionStyle>{postInfo.linkDescription}</LinkDescriptionStyle>
                        <LinkUrlStyle>
                            {postInfo.link}
                        </LinkUrlStyle>
                    </LinkInfoStyle>
                        <img src={postInfo.linkImage} alt={"Link"}/>
                </LinkBoxStyle>}
            </ContentBoxStyle>
        </BlackBoxStyle>
        <CommentBoxStyle>
            {seeComments? <>
                            {comments.map((comment)=> <Comments key={comment.id} comment={comment}/>)}
                          </>
                        :
                            ""
                        }
        </CommentBoxStyle>
        </CommentContainerStyle>
       
        
    )
}

const BlackBoxStyle = styled.div`
    background-color: #171717;
    width: 100%;
    height: auto;
    border-radius: 16px;
    margin-top:16px;
    display: flex;  

    @media (max-width: 600px){
        border-radius: 0;
}  
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

const PencilIcon =styled(TiPencil)`
color: #ffffff;
font-size: 20px;

:hover{
    cursor: pointer;
    filter: brightness(0.7);
}
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

    @media(max-width: 600px){
        word-break:break-all;
    }
`
const LinkBoxStyle = styled.div`
display: flex;
justify-content: space-between;
margin-top:10px ;
border: 1px solid #C4C4C4;
border-radius: 11px;
border-right: none;
text-decoration: none;
word-wrap: break-word;
:hover{
    cursor: pointer;
}
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
const TrashAndEditStyle = styled.div`
    display: flex;
    justify-content: space-between;
    
`
const CommentContainerStyle = styled.div`
    width: auto;
    height: auto;
    background-color: #1E1E1E;
    border-radius: 16px;

`
const CommentBoxStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`