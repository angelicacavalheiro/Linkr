import styled from "styled-components";
import { BiRepost } from "react-icons/bi";

export default function Repost({postInfo}){
    const repostCount = postInfo.repostCount;
    return(
        <>
            <RepostIcon/>
            <RepostCountStyle>
                {repostCount === 0 ?
                <span>repost</span> : 
                <span>{repostCount} reposts</span>}
            </RepostCountStyle>
        </>
    );

}

const RepostIcon = styled(BiRepost)`
    color: #FFF;
    margin-top: 8px;
`;

const RepostCountStyle = styled.div`
    color: #FFF;
    font-size: 12px;
    flex-wrap: wrap;
`;