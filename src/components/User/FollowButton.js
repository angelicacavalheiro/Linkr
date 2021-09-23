import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { getFollowingUsers, postUnfollowOrFollow } from "../../Service"

export default function FollowButton({id}){
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading]= useState(false);
    const [apperButton, setApperButton] = useState(false)
    const {user} = useContext(UserContext);

    useEffect(()=>{
       const promisse = getFollowingUsers(user.token)
       promisse.then((resp)=>{
            const array =  resp.data.users.filter((user)=> parseInt(user.id) === parseInt(id));
                    if(array.length !== 0){
                        setIsFollowing(true);
                    }
                    else{ setIsFollowing(false)}  
            setApperButton(true)  
       })
      promisse.catch(()=>alert("Erro: não foi possível executar a operação"))
       // eslint-disable-next-line react-hooks/exhaustive-deps     
    },[id])
    
 

    function followOrUnfollow(){
        setIsLoading(true)
        let action ="";
        if(isFollowing){
            action = "unfollow"
         }
         else{
             action = "follow"
         }

         const promise = postUnfollowOrFollow(user.token, id, action);
         promise.then(()=>{
             setIsLoading(false)
             setIsFollowing(!isFollowing);
         })
    }

    return(
        <>
       {apperButton? 
        <ButtonStyle isFollowing={isFollowing} onClick={isLoading? "": followOrUnfollow}>
            {isFollowing? "Unfollow":"Follow"} 
        </ButtonStyle> : ""}
        </>
    );
}

const ButtonStyle = styled.button`
    background-color: ${(props)=> props.isFollowing? "#FFFFFF" : "#1877F2"};
    color: ${(props)=> props.isFollowing? "#1877F2":"#FFFFFF"};
    border-radius: 5px;
    border: none;
    width: 112px;
    height: 31px;
    @media (max-width: 600px){
        margin-top: 20px;
        margin-right: -55%;
}  
`