import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import { postRepost } from "../Service";
import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";



export default function Repost({postInfo}){

    const postId = postInfo.id;
    const { user } = useContext(UserContext);
    const [colorIntensityCounter, setColorIntensityCounter] = useState(9);
    const [repostCount, setRepostCount] = useState(postInfo.repostCount)

    let reposted;

    if(postInfo.hasOwnProperty('repostedBy')){
        reposted = postInfo.repostedBy.username === user.username;
    }
    else{
        reposted = false;
    }

    const [wasReposted, setWasReposted] = useState(reposted);
    
    function sharePost(){
        postRepost(user.token, postId)
            .then(() => {
                setWasReposted(true);
                if(colorIntensityCounter === 1){
                    setColorIntensityCounter(1);
                }
                else{
                    setColorIntensityCounter(colorIntensityCounter-1);
                }
                
                setRepostCount(repostCount + 1);
            })
            .catch((err) => console.log('erro', err));
    }
    
    return(
        <>
            <RepostIcon wasReposted = {wasReposted} colorIntensity={colorIntensityCounter} onClick={sharePost}/>
            <RepostCountStyle wasReposted={wasReposted} colorIntensity={colorIntensityCounter} >
                {repostCount === 0 ?
                <span>repost</span> : 
                <span>{repostCount} reposts</span>}
            </RepostCountStyle>
        </>
    );

}

const RepostIcon = styled(BiRepost)`
    color: ${(props) => props.wasReposted ? `#5AFF${props.colorIntensity}2` : '#FFF'};
    margin-top: 8px;
`;

const RepostCountStyle = styled.div`
    color: ${(props) => props.wasReposted ? `#5AFF${props.colorIntensity}2` : '#FFF'};
    font-size: 11px;
    flex-wrap: wrap;
`;