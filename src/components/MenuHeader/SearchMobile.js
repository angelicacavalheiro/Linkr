import styled from 'styled-components';
import { useContext, useState} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input';
import { getUsers } from '../../Service';

export default function SearchMobile(){

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

        if(usersSearch !== ""){
            getUsers(user.token, usersSearch)
            .then((res) => {    
                sortUsers(res.data.users)                               
            }) 
            .catch((res) => {     
            setUsersFound("")                                
            });
        }                               
    } 

    function sortUsers(dataUser){

        const sortUsersFound = dataUser.sort((x, y) =>
        (x.isFollowingLoggedUser === y.isFollowingLoggedUser) ? 0 : x.isFollowingLoggedUser ? -1 : 1)

        setUsersFound(sortUsersFound)  
    }

    function clean(){        
        setUsersSearch("")
    }

    return (
        <>
            <SearchandResultsStyled onClick={toggleMenu}>
                <RelativeStyled>    
                <DebounceInputStyled
                minLength={3}
                debounceTimeout={300}
                type="text" 
                placeholder="Search for people and friends"
                value={usersSearch}
                onChange={(e) => setUsersSearch(e.target.value)} 
                onInput={search()}/>
                <Icon onClick={search} />      
                </RelativeStyled>
                <BlockStyled onClick={clean}>
                   {usersFound && usersSearch !== "" ?
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
            </SearchandResultsStyled>
        </>          
    )
}

const BlockStyled = styled.div`
    border-radius: 8px;
    background: #E7E7E7;
    overflow-x: hidden;
    width: 350px;
    margin: 0px auto 0 auto;
    max-height: 30vh;
    overflow-y: scroll;    
    
    &::-webkit-scrollbar {
    width: 10px;
    }

    &::-webkit-scrollbar-track {
    background: #E7E7E7;
    border-radius: 1000px;
    }

    &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 20px;
    }
`;

const ResultsStyled = styled.div `
    display: flex;
    width: 350px;
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
    width: 40%;
    overflow: hidden;         
    text-overflow: ellipsis;
`;

const SearchandResultsStyled = styled.div `
    @media(min-width: 600px){
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
    width: 350px;
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
    width: 350px;
    height: 45px;  
    border-radius: 8px;    
    background-color: #FFFFFF;
    margin: 100px auto 0px auto;     
`;


