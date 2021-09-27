import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { getLikes } from "../../Service";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext"
import Trending from "../../sharedComponents/Trending";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import AnimationContext from "../../contexts/AnimationContext";
import { motion } from "framer-motion";

export default function MyLikePage(){

    const {user} = useContext(UserContext);
    const [likes, setLikes]= useState([]);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("Você ainda não deu like")
    const {disappearMenu} = useContext(ShowMenuContext);
    const {pageTransition} = useContext(AnimationContext);
    

    useEffect(()=>{
        getPostsLikeAUser()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [    ])


    function getPostsLikeAUser(){
        const promise = getLikes(user.token);
            promise.then((resp)=>{
                setLoading(false)
                setLikes(resp.data.posts) 

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
                    <PageTitleStyle>my likes</PageTitleStyle>
                    <PostsAndTrendingStyle>
                        <ColunaPostsStyle>
                    
                        {likes.map((postInfo)=>
                            <Post key={postInfo.id} postInfo={postInfo} renderPage={getPostsLikeAUser}/>
                        )}
                        {loading ? <LoadingStyle>Loading...</LoadingStyle> : ""} 
                        {noPosts? <NoPostsStyle>{message} </NoPostsStyle> : ""}
                        </ColunaPostsStyle>
                        
                        <Trending />
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


