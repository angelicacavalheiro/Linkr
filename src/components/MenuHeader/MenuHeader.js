import styled from 'styled-components';
import { useState, useContext } from 'react';
import Arrow from './Arrow'
import UserImage from './UserImage'
import Menu from './Menu'

export default function MenuHeader(){

    const[showMenu , setShowMenu] = useState(false)

    return (
        <> 
            <HeaderStyled>  
                <TitleStyled>linkr</TitleStyled> 
                <RightHeaderStyled>                            
                    <Arrow showMenu={showMenu} setShowMenu={setShowMenu} />
                    <UserImage showMenu={showMenu} setShowMenu={setShowMenu} />                    
                </RightHeaderStyled>
            </ HeaderStyled>   
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />   
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
`;

const RightHeaderStyled = styled.header`
    width: 100vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;    
`;




