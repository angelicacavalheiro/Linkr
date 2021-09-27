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
import AnimationContext from "../../contexts/AnimationContext";
import { motion } from "framer-motion";

export default function UserPage(){
    
    const {user} = useContext(UserContext);
    const [nameUser, setName] = useState("")
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("ainda não há posts disponiveis");
    const {disappearMenu} = useContext(ShowMenuContext);
    const {pageTransition} = useContext(AnimationContext)
    
   

    useEffect(()=>{
        getUserPosts()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    function getUserPosts(){
        const promiseUser = getInfoUser(user.token, id);
            promiseUser.then((resp)=>{
                setName(resp.data.user.username)
            })

        const promise = getAnUserPosts(user.token, id);
            promise.then((resp)=>{
                setLoading(false)
                setPosts(resp.data.posts) 
                

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
        <motion.div initial='out' animate='in' exit = 'out' variants={pageTransition}>
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
        </motion.div>
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
