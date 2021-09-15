import styled from "styled-components";
import { FiHeart } from "react-icons/fi";

export default function Post ({postInfo}) {

    console.log(postInfo)

    return(
        <BlackBox>
            <PhotoAndLikeBox>
                <img src="https://www.pxpng.com/public/uploads/preview/-11601774644rkfopjcrfk.png" />
                <Icon />
                <p>13likes</p>
            </PhotoAndLikeBox>
            <ContentBox>
                <h3>juvenal juvenal</h3>
                <p>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material<span>ddd</span>sssssssssss</p>
                
                <LinkBox>
                    <LinkInfo>
                        <LinkTitle>Como aplicar o Material UI em um 
                        projeto React
                        </LinkTitle>
                        <LinkDescription>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.
                        </LinkDescription>
                        <LinkUrl>
                        https://medium.com/@pshrmn/a-simple-react-router
                        </LinkUrl>
                    </LinkInfo>
                        
                        <img src="https://www.pxpng.com/public/uploads/preview/-11601774644rkfopjcrfk.png"/>

                </LinkBox>
            </ContentBox>
        </BlackBox>
        
    )
}

const BlackBox = styled.div`
background-color: #171717;
width: 611px;
height: 276px;
border-radius: 16px;
margin-top:16px;
display: flex;
`
const PhotoAndLikeBox = styled.div`
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

const ContentBox = styled.div`
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
const LinkBox = styled.div`
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
const LinkInfo = styled.div`
display: flex;
flex-direction: column;
border-radius: 11px;
width: 330px;
border-right: none;
padding-left: 18px;
`
const LinkTitle = styled.div`
display: flex;
flex-direction: column;
color: #CECECE;
margin-top: 20px;
font-size: 16px;
line-height: 19px;
`
const LinkDescription = styled.div`
display: flex;
flex-direction: column;
font-size: 11px;
color:#9B9595;
margin-top: 5px;
line-height: 13px;
`
const LinkUrl = styled.div`
display: flex;
flex-direction: column;
color: #CECECE;
font-size: 11px;
line-height: 13px;
margin-top: 10px;
`
