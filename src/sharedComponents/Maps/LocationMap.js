import { MdLocationOn } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import styled from "styled-components";
import ReactModal from 'react-modal';
import {  useState } from "react";
import UserMap from './UserMap';


export default function LocationMap({latitude, longitude, username}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    return(
        <>
        <LocationIconStyle onClick={()=> setModalIsOpen(true)}/>
        <ModalQueryStyle isOpen={modalIsOpen} style={modalStyle} ariaHideApp={false}>
                <>
                    <p>
                    <span>{username}'s location</span><AiOutlineClose onClick={() => setModalIsOpen(false)}/>
                    </p>
                    <MapContainerStyle>
                        <UserMap latitude={latitude} longitude={longitude}/>
                    </MapContainerStyle>
                </>
            
        </ModalQueryStyle>
        </>
    )
}


const LocationIconStyle = styled(MdLocationOn)`
    color: #FFF;
    margin-left: 5px;
    :hover{
    cursor: pointer;
    filter: brightness(0.7);
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

const ModalQueryStyle = styled(ReactModal)`
    height: 354px;
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
        justify-content: space-between;
        width: 100%;
    }
    
    @media(max-width: 600px) {
        height: 354px;
        width: 100%;
        top: calc(50vh - 131px);
        left:0;
        border-radius: 0;
        font-size: 20px;
        padding: 15px 10px;
        p{font-size: 25px;}
    }
`
const MapContainerStyle = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 10px;
    background-color: orange;
`;