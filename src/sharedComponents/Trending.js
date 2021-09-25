import { useEffect, useContext, useState } from "react";
import styled from "styled-components"
import { getTrendingHashtags } from "../Service";
import UserContext from "../contexts/UserContext";
import { Link, useHistory } from "react-router-dom";

export default function Trending () {
    const {user} = useContext(UserContext);
    const [trendingList, setTrendingList] = useState([]);
    const [searchHashtag, setSearchHashtag] = useState([]);
    const history = useHistory();

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

    function search(e){
        if(e.keyCode === 13) {
            history.push(`/hashtag/${searchHashtag}`)    
        }      
    }
    
    return(
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
            <BlockStyle>
                <HashtahStyle>#</HashtahStyle>           
                <InputStyle 
                    type="text" 
                    placeholder="type a hashtag"
                    value={searchHashtag}
                    onChange={(e) => setSearchHashtag(e.target.value)} 
                    onKeyUp={(e)=> search(e)} 
                />
            </BlockStyle>
        </TrendingStyle>
    )
}

const BlockStyle = styled.div`
    display:flex;
`;
const HashtahStyle = styled.div`
    width: 20px;
    height: 35px;
    background: #252525;
    border-radius: 8px 0px 0px 8px;
    padding: 8px;
    margin: 0 0 0 16px;
    font-family: Lato;
    font-weight: bold;
    font-size: 19px;
    color: #FFFFFF;
`;

const InputStyle = styled.input `
    width: 249px;
    height: 35px;
    background: #252525;
    border-radius: 0px 8px 8px 0px;
    padding: 10px;
    margin: 0 15px 15px 0px;
    border: 0 none;
    font-family: Lato;
    font-size: 19px;
    line-height: 19px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    &::placeholder{
        font-style: italic;
        font-size: 16px;
        color: #575757;
    }
`;

const TrendingStyle = styled.div`
    background-color: #171717;
    width: 301px;
    height: fit-content;
    border-radius: 16px;
    color: white;
    position: sticky;
    top: 100px;

    @media(max-width:937px) {
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
