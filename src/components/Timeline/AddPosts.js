import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { postUserPost } from "../../Service";

export default function AddPosts(props){
    
    const { user } = useContext(UserContext);
    
    return(
        <WhiteBoxStyle>
            <PhotoBoxStyle>
                <LinkStyle to={`/user/${user.id}`}>
                    <img src={user.image} alt={''} />
                </LinkStyle>
            </PhotoBoxStyle>
            <PostArea token={user.token} loadPosts={props.loadPosts}/>
        </WhiteBoxStyle>
    );
}

function PostArea(props){
    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const token = props.token;

    function publishPost(event){
        event.preventDefault();
        
        const body = {text, link};
        setIsLoading(true);
        
        postUserPost(body, token)
            .then((response) => {
                setIsLoading(false);
                setLink("");
                setText("");
                props.loadPosts();               
            })
            .catch((err) => {
                setIsLoading(false);
                alert("Houve um erro ao publicar o seu link");
            });
    }

    return(
        <PostAreaFormStyle onSubmit={publishPost}>
            <StatusQuestionStyle>
                O que você tem para favoritar hoje?
            </StatusQuestionStyle>
            <InputPostLinkStyle 
                placeholder="http://..."
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
            />
            <InputPostlinkDescriptionStyle 
                placeholder="Muito irado esse link falando de #javascript"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <ButtonContainerStyle>
                <PublishButtonStyle 
                type="submit" disabled={isLoading ? true : false}>
                   {isLoading ? "Publicando" : "Publicar"}
                </PublishButtonStyle>
            </ButtonContainerStyle>
        </PostAreaFormStyle>
    );
}

const WhiteBoxStyle = styled.div`
    background-color: #FFF;
    width: 100%;
    border-radius: 16px;
    display: flex;

    @media (max-width: 600px){
        padding: 0 20px;
        border-radius: 0;
    }
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
        margin-top: 15px;
    }

    @media (max-width: 600px){
        display: none;
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
    
    @media (max-width: 600px){
        width: 100%;
    }
`;

const StatusQuestionStyle = styled.p`
    
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: 300;
    color: #707070;

    @media (max-width: 600px){
        font-size: 17px;
        text-align: center;
        margin-bottom: 5px;
        
    }
    
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

const InputPostlinkDescriptionStyle = styled.textarea`
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

    @media (max-width: 600px){
        height: 50px;
    }
`;
const ButtonContainerStyle = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;

    @media(max-width: 600px){
        padding-left: 0;
    }
`;

const PublishButtonStyle = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    border: none;
    border-radius: 5px;
    margin-top: 5px;

    font-family: 'Lato', sans-serif;
    font-weight: 700;
    color: #FFF;
`;