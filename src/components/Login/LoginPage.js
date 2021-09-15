import SiteBanner from "../../sharedComponents/SiteBanner";
import styled from "styled-components";
import { useContext, useState } from "react";
import { SignUpOrLoginInputStyled, SignUpOrLoginButtonStyled, SwitchSignUpLoginLinkStyled } from "../../sharedStyles/sharedStyles";
import { Link, useHistory } from "react-router-dom";
import { postLogin } from "../../Service";
import UserContext from "../../contexts/UserContext";

export default function LoginPage(){
    return(
        <LoginPageStyled>
            <SiteBanner/>
            <LoginArea/>
        </LoginPageStyled>
    );
}

function LoginArea (){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { setToken } = useContext(UserContext);

    function userLogin (event){

        event.preventDefault();
        const body = {email, password}
        setIsLoading(true);
        
        postLogin(body)
            .then((response) => {
                setIsLoading(false);
                console.log(response);
                setToken(response.data.token);
                history.push('/timeline');
            })
            .catch((err) => {
                setIsLoading(false);
               if (err.response.status === 500){
                    alert ('Erro de servidor');
                }
                else{
                    alert ('E-mail/senha incorretos');
                }
            });
    }


    return(
         
            <LoginDataContainerStyled onSubmit={userLogin}>
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
                <SignUpOrLoginButtonStyled 
                type="submit" 
                disabled={isLoading ? true : false}>
                    Log In
                </SignUpOrLoginButtonStyled>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                    <SwitchSignUpLoginLinkStyled>
                        First time? Create an account!
                    </SwitchSignUpLoginLinkStyled>
                </Link>
            </LoginDataContainerStyled>
        

        
    );
}

const LoginPageStyled = styled.div`
    display: flex;

    @media(max-width: 614px){
        flex-direction: column;
    }
`;

const LoginDataContainerStyled = styled.form`
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