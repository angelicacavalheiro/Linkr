import styled from 'styled-components';
import { useContext } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import ShowMenuContext from '../../contexts/ShowMenuContext';

export default function Arrow(){

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
        <>
        {
                (showMenu === true) ? 
                <p>
                    <MdKeyboardArrowUpStyled onClick={(event) => toggleMenu(event)} />
                </p>                           
                :     
                <p>
                    <MdKeyboardArrowDownStyled onClick={(event) => toggleMenu(event)}/>
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

