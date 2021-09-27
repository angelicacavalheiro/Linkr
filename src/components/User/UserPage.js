import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnUserPosts, getInfoUser} from "../../Service";
import styled from "styled-components"; 
import UserContext from "../../contexts/UserContext"
import Trending from "../../sharedComponents/Trending";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import FollowButton from "./FollowButton";

export default function UserPage(){
   
    const {user} = useContext(UserContext);
    const [nameUser, setName] = useState("")
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("ainda não há posts disponiveis");
    const {disappearMenu} = useContext(ShowMenuContext);
   
    
   

    useEffect(()=>{
        getUserPosts()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    function getUserPosts(){
        setNoPosts(false)
        const promiseUser = getInfoUser(user.token, id);
            promiseUser.then((resp)=>{
                setName(resp.data.user.username)
            })

        const promise = getAnUserPosts(user.token, id);
            promise.then((resp)=>{
                setLoading(false)
            if(resp.data.posts.length !== 0){
                let norepeatedposts = []
                norepeatedposts.push(resp.data.posts[0])
                for(let i=1; i<resp.data.posts.length; i++){
                    if(resp.data.posts[i].id !== resp.data.posts[i-1].id){
                        norepeatedposts.push(resp.data.posts[i])
                    }
                }
                setPosts(norepeatedposts) 
            }

                if(resp.data.posts.length === 0){
                    setNoPosts(true);
                }
            })
            promise.catch(Erro);
    }

    function Erro(e){
        
        if(e.response.status === 403 || e.response.status === 401){
            setMessage("Erro: Você não esta mais logado")
        }
        if(e.response.status === 404){
            setMessage("Erro: não foi encontrado")
        }
        if(e.response.status === 404){
            setMessage("Erro: não foi encontrado")
        }
        setNoPosts(true);
        setLoading(false);

    }

    return(
        <ContainerBoxStyle onClick={disappearMenu}>
            <ContainerCenterStyle>
                {loading ? "" : <PageTitleStyle>
                                    {nameUser}'s posts
                                    <FollowButton id={id}/>
                                </PageTitleStyle>}
                <PostsAndTrendingStyle>
                    <ColunaPostsStyle>
                    
                    {posts.map((postInfo)=>
                        <Post key={postInfo.id} postInfo={postInfo} renderPage={getUserPosts}/>
                    )}
                    {loading ? <LoadingStyle>Loading...</LoadingStyle> : ""} 
                    {noPosts? <NoPostsStyle>{message} </NoPostsStyle> : ""}
                </ColunaPostsStyle>
                
            <Trending></Trending>
                </PostsAndTrendingStyle>
            
            </ContainerCenterStyle>
        </ContainerBoxStyle> 
    );
}


const LoadingStyle = styled.p`
    font-size: 40px;
    color: white;
    text-align:center;
`
const NoPostsStyle = styled.p`
    font-size: 40px;
    color: white;
    text-align:center;
` 
