import { useEffect, useContext, useState } from "react";
import styled from "styled-components"
import { getTrendingHashtags } from "../Service";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function Trending () {
    const {user} = useContext(UserContext);
    const [trendingList, setTrendingList] = useState([]);

    useEffect(()=> {
        getTrendingHashtags(user.token)
        .then((res)=> {
            let list = res.data.hashtags
            setTrendingList(list);
        })
        .catch(()=> alert('algo deu errado'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(trendingList.length === 0) {
        return(
            <p>Carregando</p>
        )
    }  
    
    return(
        <TrendingStyle>
            <TitleTrendingStyle>
                <h2>Trending</h2>
            </TitleTrendingStyle>
            <TrendingListStyle>
                {trendingList.map((hashtag, index)=>{
                    return(
                        <LinkStyle to={`/hashstag/${hashtag.name}`} key={index}><p>#{hashtag.name}</p></LinkStyle>
                    )
                })}
            </TrendingListStyle>
        </TrendingStyle>
    )
}

const TrendingStyle = styled.div`
    background-color: #171717;
    width: 301px;
    height: fit-content;
    border-radius: 16px;
    color: white;

    @media(max-width:600px) {
        display: none;
    }
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
`

const LinkStyle = styled(Link)`
    font-size: 19px;
    color: white;
    text-decoration:none;
`
