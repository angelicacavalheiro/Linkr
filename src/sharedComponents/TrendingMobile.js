import { useEffect, useContext, useState } from "react";
import styled from "styled-components"
import { getTrendingHashtags } from "../Service";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function TrendingMobile () {
    const {user} = useContext(UserContext);
    const [trendingList, setTrendingList] = useState([]);
    const [showTrending , setShowTrending] = useState(false)

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

    function disappearTrending() {         
        setShowTrending(!showTrending);        
    }
    
    return(
        <>

            <TitleButtonStyle onClick={disappearTrending}>
                <h2>#</h2>
            </TitleButtonStyle>

            {
            (showTrending === true) ?                
            <TrendingStyle>
                <TitleTrendingStyle>
                    <h2>Trending</h2>
                </TitleTrendingStyle>
                <TrendingListStyle>
                    {trendingList.map((hashtag, index)=>{
                        return(
                            <LinkStyle to={`/hashtag/${hashtag.name}`} key={index}><p>#{hashtag.name}</p></LinkStyle>
                        )
                    })}
                </TrendingListStyle>
            </TrendingStyle>                
            :            
            null
            }

        </>
            
    )
}

const TitleButtonStyle= styled.div`
    background-color: #171717;
    width: 120px;
    height: 30px;
    padding: 8px 0 0 50px;
    margin-bottom: 1px;
    border-radius: 0 16px 0 0;
    color: white;

    @media(min-width: 937px) {
        display: none;
    }
`

const TrendingStyle = styled.div`
    background-color: #171717;
    width: 95vw;
    height: fit-content;
    border-radius: 0 16px 16px 0px;
    color: white;
    margin-bottom:10px;

    @media(min-width: 937px) {
        display: none;
    }
`
const TitleTrendingStyle = styled.div`
    height:30px;
    border-bottom: solid 1px #484848;
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight:bold;
    font-size: 16px;
`
const TrendingListStyle = styled.div`
    padding: 0px 10px;
    line-height: 20px;
`

const LinkStyle = styled(Link)`
    font-size: 13px;
    color: white;
    text-decoration:none;
`