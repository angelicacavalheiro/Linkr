import styled from "styled-components";

const ContainerBoxStyle = styled.div`
    background-color: #333333;
    margin: 72px auto 0px auto;
    height:100vh;
`

const ContainerCenterStyle = styled.div`
    margin: 160px auto 0px auto;
    justify-content: space-between;
    width: 937px;
    @media (max-width: 937px) {
        width: 100%;
        margin: 0px;
        padding: 17px 0;
       
    }
`
const ColunaPostsStyle = styled.div`
    width: 611px;
    
    @media (max-width: 937px) {
        width: 100%;
        
    }
`

const PageTitleStyle = styled.h2`
    color: white;
    font-size: 43px;
    margin-bottom: 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media (max-width: 937px){
        margin-left: 17px;
        flex-direction: column;
        align-items: flex-start;
        width: 90%;
    }
`
// const ColunaTrendingStyle = styled.div`
//     //nao sei se coloco ainda
// `

const SignUpOrLoginInputStyled = styled.input`
    width: 100%;
    height: 65px;
    margin-bottom: 13px;
    background-color: #FFF;
    border-radius: 6px;
    border: none;
    padding-left: 17px;

    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;
    
    &::placeholder{
        color: #9F9F9F;
    }
`

const SignUpOrLoginButtonStyled = styled.button`
    background-color: #1877F2;
    height: 65px;
    border: none;
    border-radius: 6px;
    margin-bottom: 13px;
    
    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;
    color: #FFF;

    &:hover{
        cursor: pointer;
        filter: brightness(1.2);
    }

    @media(max-width: 937px){
        width: 100%;
    }
`

const SwitchSignUpLoginLinkStyled = styled.p`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 30px;

`

const PostsAndTrendingStyle = styled.div`
    display: flex;
    justify-content: space-between;
    @media(max-width:937px) {
        width:100%;
    }
`

export {
    ContainerBoxStyle,
    ContainerCenterStyle,
    ColunaPostsStyle,
    PageTitleStyle,
    PostsAndTrendingStyle,
    SignUpOrLoginInputStyled,
    SignUpOrLoginButtonStyled,
    SwitchSignUpLoginLinkStyled
}