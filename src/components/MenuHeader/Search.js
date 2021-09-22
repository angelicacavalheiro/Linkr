import styled from 'styled-components';
import { useContext, useState} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Search(){

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
    
        console.log(config)
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/search?username=${usersSearch}`, config)
        promisse.then((res) => {    
            console.log(res.data.users[0].id) 
            setUsersFound(res.data.users)                                
             });         
    } 

    return (
        <>

            <SearchandResultsStyled onClick={toggleMenu}>
                <RelativeStyled>
                <InputStyled
                    type="text" 
                    placeholder="Search for people and friends"
                    value={usersSearch}
                    onChange={(e) => setUsersSearch(e.target.value)}
                    onInput={search}
                />                 
                <Icon onClick={search} />                 
                </RelativeStyled>

               <BlockStyled>

                    {usersFound !== ""  ?
                    //lista de usuários que eu sigo, criada com filter
                    //map nessa lista
                    //se não map na proxima lista
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
                    null}
               </BlockStyled>              
                               
            </SearchandResultsStyled>
        </>          
    )
}

const BlockStyled = styled.div`
    border-radius: 0px 0 8px 8px;
    background-color: red;
`;

const ResultsStyled = styled.div `
    display: flex;
    width: 573px;
    font-family: Lato;
    font-size: 19px;
    line-height: 23px;
    background: #E7E7E7;
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


const InputStyled = styled.input `
    width: 538px;
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


