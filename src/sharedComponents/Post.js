import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Post () {

    

    return(
        <BlackBoxStyle>
            <PhotoAndLikeBoxStyle>
            <LinkStyle to={`/user/${postInfo.user.id}`}><img src="https://www.pxpng.com/public/uploads/preview/-11601774644rkfopjcrfk.png" /></LinkStyle>
                <Icon />
                <p>{`${postInfo.likes.length} ${postInfo.likes.length > 1 ? 'likes' : 'like'}`}</p>
            </PhotoAndLikeBoxStyle>
            <ContentBoxStyle>
                <LinkStyle to={`/user/${postInfo.user.id}`}><h3>{postInfo.user.username}</h3></LinkStyle>
                <p>{postInfo.text}<span>ddd</span>sssssssssss</p>
                <LinkBoxStyle>
                    <LinkInfoStyle>
                        <LinkTitleStyle>{postInfo.linkTitle}</LinkTitleStyle>
                        <LinkDescriptionStyle>{postInfo.linkDescription}</LinkDescriptionStyle>
                        <LinkUrlStyle>
                            <a href={postInfo.link} target='_blank'>{postInfo.link}</a>
                        </LinkUrlStyle>
                    </LinkInfoStyle>
                        <img src={postInfo.linkImage}/>
                </LinkBoxStyle>
            </ContentBoxStyle>
        </BlackBoxStyle>
        
    )
}

const BlackBoxStyle = styled.div`

background-color: #171717;
width: 611px;
height: 276px;
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


`
const LinkBoxStyle = styled.div`
display: flex;
justify-content: space-between;
margin-top:10px ;
border: 1px solid #C4C4C4;
border-radius: 11px;
border-right: none;


img{
    width: 153px;
    height: 155px;
    border-radius: 0px 13px 13px 0px;
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

`
const LinkDescriptionStyle = styled.div`
display: flex;
flex-direction: column;
font-size: 11px;
color:#9B9595;
margin-top: 5px;
line-height: 13px;

`
const LinkUrlStyle = styled.div`
display: flex;
flex-direction: column;
font-size: 11px;
line-height: 13px;
margin-top: 10px;

    a{
        text-decoration:none;
        color:#CECECE;
    }
    
`

const LinkStyle = styled(Link)`
    text-decoration: none;
`
