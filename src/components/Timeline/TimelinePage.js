import ShowMenuContext from '../../contexts/ShowMenuContext';
import styled from 'styled-components';
import { useState, useContext } from 'react';

export default function TimelinePage(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);


    function disappearMenu() { 
        (showMenu === true)
        ?      
        (setShowMenu(false))
        :
        (setShowMenu(false)  )
    }

    return (
        <AllPageStyled onClick={disappearMenu}>
            <p>Timeline Page</p> 
        </AllPageStyled>  
    )
}

const AllPageStyled = styled.div`
    width: 100vw;
    height: 100vh;
`;

