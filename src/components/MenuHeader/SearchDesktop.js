import styled from 'styled-components';
import { useContext, useState} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input';
import axios from "axios";

export default function SearchDesktop(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);
    const {user} = useContext(UserContext);
    const [usersSearch, setUsersSearch] = useState("")
    const [usersFound, setUsersFound] = useState("")

    function toggleMenu(event){

        event.stopPropagation();
           
        if(showMenu === true){
            setShowMenu(!showMenu);
          }
    }

    function search(){

       const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
            }
        }
    
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/search?username=${usersSearch}`, config)
        promisse.then((res) => {    
            sortUsers(res.data.users)                               
            }); 
        promisse.catch((res) => {     
        setUsersFound("")                                
            });              
    } 

    function sortUsers(dataUser){

        const sortUsersFound = dataUser.sort((x, y) =>

        (x.isFollowingLoggedUser === y.isFollowingLoggedUser) ? 0 : x.isFollowingLoggedUser ? -1 : 1)

        setUsersFound(sortUsersFound)    

    }
        
    return (
        <>

            <SearchandResultsStyled onClick={toggleMenu}>
                <RelativeStyled>
                           
                <DebounceInputStyled
                minLength={1}
                debounceTimeout={300}
                type="text" 
                placeholder="Search for people and friends"
                value={usersSearch}
                onChange={(e) => setUsersSearch(e.target.value)} 
                onInput={search()}/>

                <Icon />                 
                </RelativeStyled>

               { usersFound.length > 4 ? 
               < BlockStyled value={"scroll"} >
                   {usersFound !== ""  ? 

                        (usersFound.map((u) => {
                            return(
                                <Link to={`/user/${u.id}`} style={{textDecoration: 'none'}}> 
                                    <ResultsStyled>
                                        <ImageStyled src={u.avatar} />   
                                        <UsernameStyled> {u.username} </UsernameStyled> 
                                        <UserStatusStyled> {u.isFollowingLoggedUser === true ? ("• following") : null} </UserStatusStyled>                                        
                                    </ResultsStyled>
                                </Link>    
                            )
                        }))                 
                        : 
                        null
                    }
                </BlockStyled>  
               : 
                < BlockStyled value={"visible"} >
                    {usersFound !== ""  ?
                        (usersFound.map((u) => {
                            return(
                                <Link to={`/user/${u.id}`} style={{textDecoration: 'none'}}> 
                                    <ResultsStyled>
                                        <ImageStyled src={u.avatar} />   
                                        <UsernameStyled> {u.username} </UsernameStyled>   
                                        <UserStatusStyled> {u.isFollowingLoggedUser === true ? ("• following") : null} </UserStatusStyled>   
                                    </ResultsStyled>
                                </Link>    
                            )
                        }))                 
                        : 
                        null
                    }
                </BlockStyled>             
               }                        
            </SearchandResultsStyled>
        </>          
    )
}

const BlockStyled = styled.div`
    border-radius: 8px 8px 8px 8px;
    background: #E7E7E7;
    overflow-y: ${(props) => props.value}; 
    height: ${(props) => props.value === "visible" ? "auto" : "50vh"};
`;

const ResultsStyled = styled.div `
    display: flex;
    width: 573px;
    font-family: Lato;
    font-size: 19px;
    line-height: 23px;
`;

const UserStatusStyled = styled.p`    
    color: #C5C5C5;
    margin: 20px 10px 0 2px;
`;

const ImageStyled = styled.img`
    width: 39px;
    height: 39px;
    margin: 10px;
    border-radius: 26.5px;
`;

const UsernameStyled = styled.p`
    margin: 20px 10px 0 2px;
    color: #515151;
`;

const SearchandResultsStyled = styled.div `
    @media(max-width: 800px){
        display:none
    }

`;

const Icon = styled(AiOutlineSearch)`
    color: #C6C6C6;    
    width: 35px;
    height: 45px;
    padding-right: 10px;
    background: #FFFFFF;
    border-color: #FFFFFF;
    border-radius: 0 8px 8px 0;
    outline: 0;
    font-family: Lato;
    font-size: 19px;
    cursor: pointer;
`;

const DebounceInputStyled = styled(DebounceInput) `
    width: 553px;
    height: 45px;
    background: #FFFFFF;
    border-color: #FFFFFF;
    border-radius: 8px 0 0 8px;
    outline: 0;
    border-block: inherit;
    font-family: Lato;
    font-size: 19px;

    &::placeholder{
        padding-top: 17px;
        padding-left: 10px;
        line-height: 23px;
        color: #C6C6C6;
    }
`;

const RelativeStyled = styled.div `
    display: flex;
    justify-content: center;
    height: 45px;
    margin-top: 13px;    
    border-radius: 8px;    
    background-color: #FFFFFF;
`;


