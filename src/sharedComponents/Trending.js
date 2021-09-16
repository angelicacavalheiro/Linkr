
import styled from "styled-components"
export default function Trending () {

    return(
        <TrendingStyle>
            <h1>Componente Trending</h1>
        </TrendingStyle>
    )
}

const TrendingStyle = styled.div`
    background-color: green;
    display: initial;

    @media (max-width: 600px) {
        display: none;
    }
`