import SiteBanner from "../../sharedComponents/SiteBanner";
import styled from "styled-components";
import { useState } from "react";

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
    const [pictureURL, setPictureURL] = useState("");

    return(
        <SignUpDataContainerStyled>
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
                placeholder="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <SignUpOrLoginInputStyled 
                type="url" 
                placeholder="picture url"
                value={pictureURL}
                onChange={(e) => setPictureURL(e.target.value)}
                required
            />



        </SignUpDataContainerStyled>
    );
}

const SignUpPageStyled = styled.div`
    display: flex;
`;

const SignUpDataContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;

const SignUpOrLoginInputStyled = styled.input`
`