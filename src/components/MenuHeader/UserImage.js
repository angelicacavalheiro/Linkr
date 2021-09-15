import styled from 'styled-components';
import { useState, useContext } from 'react';
import ShowMenuContext from '../../contexts/ShowMenuContext';

export default function UserImage(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);

    
    function toggleMenu(event){

        event.stopPropagation();
           
        (showMenu === true)
        ?
        (setShowMenu(false))
        :
        (setShowMenu(true))    
    }

    return (
           <ImageStyle onClick={(event) => toggleMenu(event) } src="https://lh3.googleusercontent.com/proxy/Aac1hByZgG6p_79HlPLObDWtDzApgtIfLS9IBb-VtrBbO_n5ytllyjzWGQL8qI5axMtNcmdpsg6fHY1fQOW8VmTswfVlYGGtmB2TmLx-qKGHgMPO" />      
    )
}

const ImageStyle = styled.img`
    width: 53px;
    height: 53px;
    margin: 13px;
    border-radius: 26.5px;
`;



