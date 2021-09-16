import styled from 'styled-components';
import { useState, useContext } from 'react';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import UserContext from '../../contexts/UserContext';

export default function UserImage(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);
    const {user} = useContext(UserContext);
    
    function toggleMenu(event){

        event.stopPropagation();
           
        (showMenu === true)
        ?
        (setShowMenu(false))
        :
        (setShowMenu(true))    
    }

    return (
           <ImageStyle onClick={(event) => toggleMenu(event) } src={user.image} />      
    )
}

const ImageStyle = styled.img`
    width: 53px;
    height: 53px;
    margin: 20px;
    border-radius: 26.5px;
`;



