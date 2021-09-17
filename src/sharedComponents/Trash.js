import { BiTrash } from "react-icons/bi";
import styled from "styled-components";
import ReactModal from 'react-modal';
import { useState } from "react";
import { tryDeletePost } from "../Service";

export default function Trash({postId}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

   function deletePost() {
    tryDeletePost()
   }
    return(
        <>
        <TrashStyle onClick={()=> setModalIsOpen(true)}></TrashStyle>
        <ModalQueryStyle isOpen={modalIsOpen} style={modalStyle} ariaHideApp={false}>
            <p>Tem certeza que deseja {"\n"} excluir essa publicação?</p>
            <ButtonsStyle>
                <ButtonStyle backColor={'white'} color={'#1877F2'} onClick={()=> setModalIsOpen(false)}>Não, voltar</ButtonStyle>
                <ButtonStyle backColor={'#1877F2'} color={'white'} onClick={deletePost}>Sim, excluir</ButtonStyle>
            </ButtonsStyle>
        </ModalQueryStyle>
        </>
    )
}


const TrashStyle = styled(BiTrash)`
    color: white;
    margin-left: 5px;
`

const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)', 
     },
     content: {
         border: 'none',   
     }
 }

const ModalQueryStyle = styled(ReactModal)`
    height: 262px;
    width: 597px;
    top: calc(50vh - 131px);
    left: calc(50vw - 298px);
    padding: 60px 100px;
    position: fixed;
    background-color: #333333;
    border: none;
    border-radius: 50px;
    font-size: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    color: white;
    
    
    

    @media(max-width: 600px) {
        height: 20vh;
        width: 80vw;
        top: calc(50vh - 10vh);
        left: calc(50vw - 40vw);
        font-size: 20px;
        padding: 15px 10px;
    }
`

const ButtonsStyle = styled.div`
    display: flex;
    margin: 20px 0px;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    width: 70%;
    
`
const ButtonStyle = styled.button`
    width:200px;
    height: 40px;
    border-radius: 5px;
    background-color: ${(props) => props.backColor};
    color: ${(props) => props.color};
    font-weight: bold;
    border: none;
    font-size: 18px;
    padding: 2px 2px;
`