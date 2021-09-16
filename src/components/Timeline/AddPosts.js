import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { postUserPost } from "../../Service";

export default function AddPosts(){
    
    const { user } = useContext(UserContext);
    
    return(
        <WhiteBoxStyle>
            <PhotoBoxStyle>
                <linkStyle to={`/user/${user.id}`}>
                    <img src={user.image} alt={''} />
                </linkStyle>
            </PhotoBoxStyle>
            <PostArea token={user.token}/>
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
            <InputPostlinkStyle 
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
const linkStyle = styled(Link)`
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

const InputPostlinkStyle = styled.input`
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