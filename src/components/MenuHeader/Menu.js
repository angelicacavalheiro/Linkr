import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function Menu({showMenu, setShowMenu}){
    return (
        <>
            {
                (showMenu === true) ?                
                <MyMenuStyle>
                    <OptionsStyle> 
                    <p > My Likes </p>
                    <p > My Posts </p>
                    <p > Logout </p>
                    </OptionsStyle>
                </MyMenuStyle>                 
                :            
                null
            }  
        </>             
    )
}

{/* <Link to="/my-likes"> My Likes </Link>
<Link to="/my-posts"> My Posts </Link>
<Link to="/"> Logout </Link> */}

const OptionsStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    width: 150px;
    height: 109px;

    p{
        font-family: Lato;
        font-weight: bold;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        margin: 5px auto 5px auto;
    }
`;

const MyMenuStyle = styled.div`
    display: flex;
    justify-content: flex-end;    
`;
