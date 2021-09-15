import styled from 'styled-components';
import { useState, useContext } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import ShowMenuContext from '../../contexts/ShowMenuContext';

export default function Arrow(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);


    return (
        <>
        {
                (showMenu === true) ? 
                <p>
                    <MdKeyboardArrowUpStyled />
                </p>                           
                :     
                <p>
                    <MdKeyboardArrowDownStyled />
                </p>       
                
            }  
        </>
           
            
    )
}

const MdKeyboardArrowDownStyled = styled(MdKeyboardArrowDown)`
    color: #FFFFFF;   
    font-size: 40px;
    
`;

const MdKeyboardArrowUpStyled = styled(MdKeyboardArrowUp)`
    color: #FFFFFF;   
    font-size: 40px;
`;

