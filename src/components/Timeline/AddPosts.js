import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function AddPosts(){
    
    const { user } = useContext(UserContext);
    
    return(
        <WhiteBoxStyle>
            <PhotoBoxStyle>
                <LinkStyle to={`/user/${user.id}`}>
                    <img src={user.image} alt={''} />
                </LinkStyle>
            </PhotoBoxStyle>
            <PostArea/>
        </WhiteBoxStyle>
    );
}

function PostArea(){
    const [postUrl, setPostUrl] = useState("");
    const [postDescription, setPostDescription] = useState("");
    
    function publishPost(event){
        event.preventDefault();
        alert('publicando');
    }

    return(
        <PostAreaFormStyle onSubmit={publishPost}>
            <StatusQuestionStyle>
                O que você tem para favoritar hoje?
            </StatusQuestionStyle>
            <InputPostLinkStyle 
                placeholder="http://..."
                type="url"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                required
            />
            <InputPostLinkDescriptionStyle 
                placeholder="Muito irado esse link falando de #javascript"
                type="text"
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
            />
            <ButtonContainerStyle>
                <PublishButtonStyle type="submit">
                    Publicar
                </PublishButtonStyle>
            </ButtonContainerStyle>
        </PostAreaFormStyle>
    );
}

const WhiteBoxStyle = styled.div`
    background-color: #FFF;
    width: 100%;
    border-radius: 16px;
    margin-top:16px;
    display: flex;
`;
const PhotoBoxStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
    text-align: center;

    img{
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-top: 8px;
    }
`;
const LinkStyle = styled(Link)`
    text-decoration: none;
`;

const PostAreaFormStyle = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    width: 82%;
`;

const StatusQuestionStyle = styled.p`
    
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: 300;
    color: #707070;
    
`;

const InputPostLinkStyle = styled.input`
    border: none;
    background-color: #EFEFEF;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 10px;

    &::placeholder{
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        font-weight: 300;
        color: #949494;
    }
`;

const InputPostLinkDescriptionStyle = styled.textarea`
    height: 66px;
    border: none;
    background-color: #EFEFEF;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 5px;

    &::placeholder{
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        font-weight: 300;
        color: #949494;
        text-align: start;
    }
`;
const ButtonContainerStyle = styled.div`
    width: 100%;
    padding-left: 77.5%;
`;

const PublishButtonStyle = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1777F2;
    border: none;
    border-radius: 5px;
    margin-top: 5px;

    font-family: 'Lato', sans-serif;
    font-weight: 700;
    color: #FFF;
`;