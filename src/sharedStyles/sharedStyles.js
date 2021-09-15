import styled from "styled-components";

const ContainerBoxStyle = styled.div`
    background-color: #333333;
    margin: 72px auto 0px auto;
    height:100vh;
`

const ContainerCenterStyle = styled.div`
    margin: 160px auto 0px auto;
    display: flex;
    justify-content: space-between;
    width: 937px;

    @media (max-width: 600px) {
        width: 100%;
        margin:160px 0px;
       
    }
    

`
const ColunaPostsStyle = styled.div`
    width: 611px;
    
    @media (max-width: 600px) {
        width: 100%;
        padding: 17px;
    }

`

const PageTitleStyle = styled.h2`
    color: white;
    font-size: 43px;
    margin-bottom: 43px;
`
// const ColunaTrendingStyle = styled.div`
//     //nao sei se coloco ainda
// `

export {
    ContainerBoxStyle,
    ContainerCenterStyle,
    ColunaPostsStyle,
    PageTitleStyle
}