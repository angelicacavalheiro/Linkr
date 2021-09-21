import styled from 'styled-components';
import { useContext, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ShowMenuContext from '../../contexts/ShowMenuContext';

export default function Search(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);
    const [people, setPeople] = useState("")

    function toggleMenu(event){

        event.stopPropagation();
           
        if(showMenu === true){
            setShowMenu(!showMenu);
          }
    }


    return (
        <RelativeStyled>
            <InputStyled
                type="text" 
                placeholder="Search for people and friends"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                required
            />                 
            <Icon />                       
        </RelativeStyled>
           
            
    )
}

const Icon = styled(AiOutlineSearch)`
    color: #C6C6C6;    
    width: 35px;
    height: 45px;
    padding-right: 10px;
    background: #FFFFFF;
    border-color: #FFFFFF;
    border-radius: 0 8px 8px 0;
    outline: 0;
    font-family: Lato;
    font-size: 19px;
`;


const InputStyled = styled.input `
    width: 538px;
    height: 45px;
    background: #FFFFFF;
    border-color: #FFFFFF;
    border-radius: 8px 0 0 8px;
    outline: 0;
    border-block: inherit;
    font-family: Lato;
    font-size: 19px;

    &::placeholder{
        padding-top: 17px;
        padding-left: 10px;
        line-height: 23px;
        color: #C6C6C6;
    }
`;

const RelativeStyled = styled.div `
    display: flex;
    justify-content: center;
    height: 45px;
    margin-top: 13px;    
    border-radius: 8px;    
    background-color: #FFFFFF;
`;


