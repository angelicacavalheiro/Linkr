import styled from 'styled-components';
import { useContext } from 'react';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import Arrow from './Arrow'
import UserImage from './UserImage'
import Menu from './Menu'
import SearchDesktop from './SearchDesktop'
import { Link } from 'react-router-dom';


export default function MenuHeaderPage(){

    const {disappearMenu} = useContext(ShowMenuContext);    

    return (
        <> 
            <HeaderStyled onClick={disappearMenu}>  
                <TitleStyled>
                    <LinkStyle style={{textDecoration:'none', color:'#FFF'}} to="/timeline">
                        linkr
                    </LinkStyle>
                </TitleStyled> 
                <SearchDesktop/>
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
    width: 200px;
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
    justify-content: space-between; 
`;

const RightHeaderStyled = styled.header`
    width: 150px;
    display: flex;
    justify-content: flex-end;
    align-items: center;  
`;

const LinkStyle = styled(Link)`
    :hover{
        filter: brightness(0.9);
    }
`;
