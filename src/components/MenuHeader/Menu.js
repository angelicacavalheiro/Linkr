import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from 'react';
import ShowMenuContext from '../../contexts/ShowMenuContext';

export default function Menu({email, setEmail, password, setPassword}){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);
    const history = useHistory();

    console.log(email)
    console.log(password)


    function disappearMenu(){       
        (setShowMenu(false))            
    }

    function cleanUserLogin(){       
            
        history.push("/")
    }

    return (
        <>
            {
                (showMenu === true) ?                
                <MyMenuStyled>
                    <OptionsStyled> 
                    <Link to="/my-likes" onClick={disappearMenu} style={{textDecoration: 'none'}}> <p>My Likes</p> </Link>
                    <Link to="/my-posts" onClick={disappearMenu} style={{textDecoration: 'none'}}> <p>My Posts</p> </Link>
                    <button onClick={cleanUserLogin}> Logout</button> 
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

const MyMenuStyled = styled.div`
    display: flex;
    top:72px;
    right: 0px;
    position: fixed;
    z-index: 1; 
`;

