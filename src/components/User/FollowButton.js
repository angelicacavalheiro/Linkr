import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import UserContext from "../../contexts/UserContext";
import {getFollowingUsers} from "../../Service"

export default function FollowButton({id}){
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading]= useState(false);
    // const {following, setFollowing} = useContext(ShowMenuContext);
    const {user} = useContext(UserContext);

    useEffect(()=>{
       const promisse = getFollowingUsers(user.token)
       promisse.then((resp)=>{
            const array =  resp.data.users.filter((user)=> user.id == id);
                    if(array.length !== 0){
                        setIsFollowing(true);
                    }
                    else{ setIsFollowing(false)}  
       })
      
            
    },[id])
    
    

    function followOrUnfollow(){
        // if(following){

        // }
    }

    return(
        <ButtonStyle isFollowing={isFollowing} onClick={isLoading? "": followOrUnfollow}>
            {isFollowing? "Unfollow":"Follow"} 
        </ButtonStyle>
    );
}

const ButtonStyle = styled.button`
    background-color: ${(props)=> props.isFollowing? "#FFFFFF" : "#1877F2"};
    color: ${(props)=> props.isFollowing? "#1877F2":"#FFFFFF"};
    border-radius: 5px;
    border: none;
    width: 112px;
    height: 31px;
`