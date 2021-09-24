import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import UserContext from "../../contexts/UserContext";

export default function Menu(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();


    function disappearMenu(){       
        (setShowMenu(false))            
    }

    function cleanUserLogin(){  
        (setShowMenu(false))    
        if (user.token !== undefined) {
            localStorage.clear()
            setUser({})     
            history.push("/")
        }            
    }

    return (
        <>
            {
                (showMenu === true) ?                
                <MyMenuStyled>
                    <OptionsStyled> 
                    <Link to="/my-likes" onClick={disappearMenu} style={{textDecoration: 'none'}}> <p>My Likes</p> </Link>
                    <Link to="/my-posts" onClick={disappearMenu} style={{textDecoration: 'none'}}> <p>My Posts</p> </Link>
                    <p onClick={cleanUserLogin}> Logout</p> 
                    </OptionsStyled>
                </MyMenuStyled>                 
                :            
                null
            }  
        </>             
    )
}


const OptionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    width: 150px;
    height: 109px;

    p {
        font-family: Lato;
        font-weight: bold;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        margin: 5px auto 5px auto;
        cursor: pointer;
        
        :hover{
            filter: brightness(0.7);
            cursor: pointer;
        }
    }
`;

const MyMenuStyled = styled.div`
    display: flex;
    top:72px;
    right: 0px;
    position: fixed;
    z-index: 1; 
`;

