import styled from 'styled-components';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export default function Arrow({showMenu, setShowMenu}){
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

