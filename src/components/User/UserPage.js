import ShowMenuContext from '../../contexts/ShowMenuContext';
import styled from 'styled-components';
import { useContext } from 'react';

export default function MyUserPage(){

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
            <p>My User Page</p> 
        </AllPageStyled>  
    )
}

const AllPageStyled = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 150px;
`;
