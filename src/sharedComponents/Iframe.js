import ReactModal from 'react-modal';
import styled from 'styled-components';
import { BiX } from "react-icons/bi";

export default function  Iframe({postInfo, displayIframe, setDisplayIframe}) {
    return (
        <ModalQueryStyle isOpen={displayIframe} style={modalStyle} ariaHideApp={false}>
            <ButtonsStyle>
                <a href={postInfo.link} target='_blank'rel="noreferrer"><ButtonStyle>Open in new tab</ButtonStyle></a>
                <CloseOutlineStyle onClick={()=> setDisplayIframe(false)}></CloseOutlineStyle>
            </ButtonsStyle>
            <IframeStyle src={postInfo.link} name='previePostLink' width='100%' height='90%'></IframeStyle>
        </ModalQueryStyle>
    )   
}

const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
     },
     content: {
        border: 'none',   
     }
 }

 const ModalQueryStyle = styled(ReactModal)`
    height: 75vh;
    width: 80vw;
    top: calc(50vh - 37.5vh);
    left: calc(50vw - 40vw);
    padding: 30px 50px;
    position: fixed;
    background-color: #333333;
    border: none;
    border-radius: 20px;
    font-size: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    color: white;
    outline: none;
    
    @media(max-width: 600px) {
        font-size: 20px;
        padding: 15px 10px;
    }
`
const ButtonStyle = styled.button`

    height: 40px;
    border-radius: 5px;
    background-color: #1877F2;
    color: white;
    font-weight: bold;
    border: none;
    font-size: 18px;
    padding: 2px 2px;
    :hover { 
        cursor: pointer;
    }
`

const ButtonsStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    
`

const IframeStyle = styled.iframe`
    border-radius: 20px;
`

const CloseOutlineStyle = styled(BiX)`
    font-size: 50px;
    color: white;
    :hover{
        cursor: pointer;
    }
    
`