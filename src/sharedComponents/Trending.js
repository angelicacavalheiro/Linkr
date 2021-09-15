import styled from "styled-components"

export default function Trending () {

    return(

        <TrendingStyle>
            <TitleTrendingStyle>
                <h2>Trending</h2>
            </TitleTrendingStyle>
            <TrendingListStyle>
                <p>lista</p>
                <p>lista</p>
                <p>lista</p>
            </TrendingListStyle>
        </TrendingStyle>
    )
}

const TrendingStyle = styled.div`
    background-color: #171717;
    width: 301px;
    border-radius: 16px;
    color: white;

`
const TitleTrendingStyle = styled.div`
    height:60px;
    border-bottom: solid 1px #484848;
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight:bold;
    font-size: 27px;
    
    
`
const TrendingListStyle = styled.div`
    padding: 25px 10px;
    line-height:30px;
    font-size: 19px;
`