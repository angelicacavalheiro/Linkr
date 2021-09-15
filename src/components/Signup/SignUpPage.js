import SiteBanner from "../../sharedComponents/SiteBanner";
import styled from "styled-components";
import { useState } from "react";
import { SignUpOrLoginInputStyled, SignUpOrLoginButtonStyled, SwitchSignUpLoginLinkStyled } from "../../sharedStyles/sharedStyles";
import { postSignUp } from "../../Service";
import { Link, useHistory } from "react-router-dom";


export default function SignUpPage(){
    return(
        <SignUpPageStyled>
            <SiteBanner/>
            <SignUpArea/>
        </SignUpPageStyled>
    );
}

function SignUpArea (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pictureUrl, setpictureUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function userSignUp (event){

        event.preventDefault();
        const body = {email, password, username, pictureUrl}
        setIsLoading(true);
        
        postSignUp(body)
            .then((response) => {
                setIsLoading(false);
                history.push('/');
            })
            .catch((err) => {
                setIsLoading(false);
                if (err.response.status === 403){
                    alert ('O e-mail inserido já está cadastrado.');
                }
                else if (err.response.status === 500){
                    alert ('Erro de servidor');
                }
                else{
                    alert ('Erro ao realizar cadastro');
                }
            });
    }


    return(
         
            <SignUpDataContainerStyled onSubmit={userSignUp}>
                <SignUpOrLoginInputStyled 
                    type="email" 
                    placeholder="e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <SignUpOrLoginInputStyled 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <SignUpOrLoginInputStyled 
                    type="username" 
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <SignUpOrLoginInputStyled 
                    type="url" 
                    placeholder="picture url"
                    value={pictureUrl}
                    onChange={(e) => setpictureUrl(e.target.value)}
                    required
                />
                <SignUpOrLoginButtonStyled type="submit" disabled={isLoading ? true : false}>
                    Sign Up
                </SignUpOrLoginButtonStyled>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                    <SwitchSignUpLoginLinkStyled>
                        Switch back to log in
                    </SwitchSignUpLoginLinkStyled>
                </Link>
            </SignUpDataContainerStyled>
        

        
    );
}

const SignUpPageStyled = styled.div`
    display: flex;

    @media(max-width: 614px){
        flex-direction: column;
    }
`;

const SignUpDataContainerStyled = styled.form`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;

    @media(max-width: 614px){
        width: 90%;
        align-items:center;
        margin-top: 40px;
    }
`;