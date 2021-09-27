import { useEffect, useContext, useState } from "react";
import styled from "styled-components"
import { getTrendingHashtags } from "../Service";
import UserContext from "../contexts/UserContext";
import { Link, useHistory } from "react-router-dom";

export default function TrendingMobile () {
    const {user} = useContext(UserContext);
    const [trendingList, setTrendingList] = useState([]);
    const [showTrending , setShowTrending] = useState(false)
    const [toggleOpacity, setToggleOpacity] = useState(0)
    const [toggleHeight, setToggleHeight] = useState(0)
    const [searchHashtag, setSearchHashtag] = useState([]);
    const history = useHistory();
    const styles = {
        transition: "all 500ms ease-out"
    }

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
        
        if (showTrending === true) {
           setToggleOpacity(1)
           setToggleHeight("fit-content")
        } else {
           setToggleOpacity(0)
           setToggleHeight(0)
        }
    }

    function search(e){
        if(e.keyCode === 13) {
            history.push(`/hashtag/${searchHashtag}`)    
        }      
    }
    
    return(
        <>

            <TitleButtonStyle onClick={disappearTrending}>
                <h2>#</h2>
            </TitleButtonStyle>                
            
            <TrendingStyle style={{...styles, opacity: toggleOpacity, height: toggleHeight}}>
                    <TitleTrendingStyle >
                        <h2>Trending</h2>
                    </TitleTrendingStyle>
                    <TrendingListStyle >
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
        </>
    )
}

const BlockStyle = styled.div`
    display:flex;
`;
const HashtahStyle = styled.div`
    width: 20px;
    height: 30px;
    background: #252525;
    border-radius: 8px 0px 0px 8px;
    padding: 9px;
    margin: 5px 0px 5px 10px;
    font-family: Lato;
    font-weight: bold;
    font-size: 14px;
    color: #FFFFFF;
`;

const InputStyle = styled.input `
    width: 100px;
    height: 30px;
    background: #252525;
    border-radius: 0px 8px 8px 0px;
    padding: 5px;
    margin: 5px 5px 0px 0px;
    border: 0 none;
    font-family: Lato;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    &::placeholder{
        font-style: italic;
        font-size: 12px;
        color: #575757;
    }
`;

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
    width: 100vw;
    //height: fit-content;
    border-radius: 0 16px 16px 0px;
    color: white;

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