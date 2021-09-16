import styled from 'styled-components';
import { useState, useContext } from 'react';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import Arrow from './Arrow'
import UserImage from './UserImage'
import Menu from './Menu'

export default function MenuHeaderPage(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);

    function disappearMenu() { 
        (showMenu === true)
        ?      
        (setShowMenu(false))
        :
        (setShowMenu(false)  )
    }


    return (
        <> 
            <HeaderStyled onClick={disappearMenu}>  
                <TitleStyled>linkr</TitleStyled> 
                <RightHeaderStyled>                            
                    <Arrow />
                    <UserImage />                    
                </RightHeaderStyled>
            </ HeaderStyled >   
            <Menu />   
        </>  
    )
}


const TitleStyled = styled.title`
    font-family: Passion One;    
    font-weight: bold;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 28px;
   
`;

const HeaderStyled = styled.header`
    width: 100vw;
    height: 72px;
    background: #151515;
    display: flex; 
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
`;

const RightHeaderStyled = styled.header`
    width: 100vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;    
`;




