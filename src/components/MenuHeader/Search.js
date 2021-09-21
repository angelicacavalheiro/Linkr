import styled from 'styled-components';
import { useContext, useState} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import ShowMenuContext from '../../contexts/ShowMenuContext';
import UserContext from "../../contexts/UserContext";
import axios from "axios";

export default function Search(){

    const {showMenu, setShowMenu} = useContext(ShowMenuContext);
    const {user} = useContext(UserContext);
    const [usersSearch, setUsersSearch] = useState("")

    function toggleMenu(event){

        event.stopPropagation();
           
        if(showMenu === true){
            setShowMenu(!showMenu);
          }
    }

    function search(){
       console.log(usersSearch)

       const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
            }
        }
    
        console.log(config)
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/search?username=${usersSearch}`, config)
        promisse.then((res) => {    
            console.log(res.data.users)                                 
             });         
    } 


    return (
        <RelativeStyled onClick={toggleMenu}>
            <InputStyled
                type="text" 
                placeholder="Search for people and friends"
                value={usersSearch}
                onChange={(e) => setUsersSearch(e.target.value)}
            />                 
            <Icon onClick={search} />                       
        </RelativeStyled>
           
            
    )
}

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


