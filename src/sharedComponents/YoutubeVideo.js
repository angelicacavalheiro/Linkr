import getYouTubeID from "get-youtube-id";
import YouTube from "react-youtube";
import styled from "styled-components";

export default function YoutubeVideo({link}){
    const idYoutubeVideo = getYouTubeID(link);
 
    return(
        <>
        <YoutubeVideoStyled
            videoId={idYoutubeVideo}
          />
          <Link>{link}</Link>
        </>
    )
}

const YoutubeVideoStyled =styled(YouTube)`
height: 220px;
width: 100%;
margin-top: 5px;


`
const Link = styled.p`
margin-bottom: 10px;

`