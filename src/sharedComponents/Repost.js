import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import { postRepost } from "../Service";
import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import ReactModal from "react-modal";

export default function Repost({postInfo}){

    const postId = postInfo.id;
    const { user } = useContext(UserContext);
    const [colorIntensityCounter, setColorIntensityCounter] = useState(1);
    const [repostCount, setRepostCount] = useState(postInfo.repostCount)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    let reposted;

    if(postInfo.hasOwnProperty('repostedBy')){
        reposted = postInfo.repostedBy.username === user.username;
    }
    else{
        reposted = false;
    }

    const [wasReposted, setWasReposted] = useState(reposted);
    
    function sharePost(){
        setModalIsOpen(false);
        postRepost(user.token, postId)
            .then(() => {
                setWasReposted(true);
                setColorIntensityCounter(colorIntensityCounter + 0.4);
                setRepostCount(repostCount + 1);
            })
            .catch(() => alert('Erro ao repostar.'));
    }
    
    return(
        <>
            <RepostContainer onClick={() => setModalIsOpen(true)}>
                <RepostIcon 
                    wasReposted = {wasReposted} 
                    colorIntensity={colorIntensityCounter}
                />
                <RepostCountStyle wasReposted={wasReposted} colorIntensity={colorIntensityCounter} >
                    {repostCount === 0 ?
                    <span>repost</span> : 
                    <span>{repostCount} reposts</span>}
                </RepostCountStyle>
            </RepostContainer>
            
            
            <ModalQueryStyle isOpen={modalIsOpen} style={modalStyle} ariaHideApp={false}>
                <>
                    <p>Compartilhar publicação?</p>
                    <ButtonsContainerStyle>
                        <button onClick={sharePost}>
                            Sim
                        </button>
                        <button onClick={() => setModalIsOpen(false)}>
                            Não
                        </button>
                    </ButtonsContainerStyle>
                </>  
            </ModalQueryStyle>
        </>
        
    );

}

const RepostIcon = styled(BiRepost)`
    color: ${(props) => props.wasReposted ? `#5AFF92` : '#FFF'};
    filter: saturate(${(props) => props.colorIntensity});
    margin-top: 8px;
`;

const RepostCountStyle = styled.div`
    color: ${(props) => props.wasReposted ? `#5AFF92` : '#FFF'};
    filter: saturate(${(props) => props.colorIntensity});
    font-size: 11px;
    flex-wrap: wrap;
    padding-bottom: 20px;
`;

const RepostContainer = styled.div`
    :hover{
        cursor: pointer;
        filter: brightness(0.7);
    }
`

const ModalQueryStyle = styled(ReactModal)`
    height: 250px;
    width: 55%;
    top: calc(50vh - 131px);
    left: calc(50vw - 298px);
    padding: 30px;
    position: fixed;
    background-color: #333333;
    border: none;
    border-radius: 50px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: white;
    outline: none;

    p{
        font-size: 38px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        text-align: start;
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 30px;
    }
    
    @media(max-width: 600px) {
        height: 200px;
        width: 100%;
        top: calc(50vh - 131px);
        left:0;
        border-radius: 0;
        font-size: 20px;
        padding: 15px 10px;
        p{font-size: 25px;}
    }
`

const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)', 
     },
     content: {
        border: 'none',   
     }
 }

 const ButtonsContainerStyle = styled.div`
    width: 58%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;

    button{
        width: 122px;
        height: 41px;
        background-color: #1877F2;
        border: none;
        border-radius: 5px;
        margin-top: 5px;

        font-family: 'Lato', sans-serif;
        font-weight: 700;
        color: #FFF;

        :hover{
            filter: brightness(1.2);
            cursor: pointer;
        }
    }

    @media (max-width:600px){
        width: 250px;

        button{
            width: 112px;
            height: 31px;
        }
    }
 `;