import styled from 'styled-components';
import Arrow from './Arrow'
import UserImage from './UserImage'
import Menu from './Menu'

export default function MenuHeader(){
    return (
        <>
            <Header>            
                <Arrow />
                <UserImage />  
            </ Header>   
            <Menu />   
        </>  
    )
}

const Header = styled.header`
    width: 100vw;
    height: 40px;
    background-color: pink;
    display: flex;
    justify-content: flex-end;
   
`;




