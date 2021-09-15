import { useEffect, useContext, useState } from "react";
import styled from "styled-components"
import { getTrendingHashtags } from "../Service";
import UserContext from "../contexts/UserContext";
export default function Trending () {
    const {user} = useContext(UserContext);
    const [trendingList, setTrendingList] = useState([]);

    useEffect(()=> {
        getTrendingHashtags(user.token)
        .then((res)=> {
            console.log(res.data)
            let list = res.data.hashtags
            setTrendingList(list);

        })
        .catch(()=> alert('algo deu errado'))
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
                        <p key={index}>{hashtag.name}</p>
                    )
                })}
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