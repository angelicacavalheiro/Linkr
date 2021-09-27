import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { getAnUserPosts} from "../../Service";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext"
import Trending from "../../sharedComponents/Trending";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import AnimationContext from "../../contexts/AnimationContext";
import { motion } from "framer-motion";

export default function MyPostPage(){

    const {user} = useContext(UserContext);
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("Você ainda não tem posts")
    const {disappearMenu} = useContext(ShowMenuContext);
    const { pageTransition } = useContext(AnimationContext);
   

    useEffect(()=>{
        getMyPosts()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [    ])


    function getMyPosts(){
        const promise = getAnUserPosts(user.token, user.id);
            promise.then((resp)=>{
                setLoading(false)
                let justMyposts = resp.data.posts.filter((post)=> post.user.id === user.id)
                setPosts(justMyposts) 
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
        <motion.div initial='out' animate='in' exit = 'out' variants={pageTransition} key='my-posts-animation'>
            <ContainerBoxStyle onClick={disappearMenu}>
                <ContainerCenterStyle>
                    <PageTitleStyle>my posts</PageTitleStyle>
                    <PostsAndTrendingStyle>
                        <ColunaPostsStyle>
                    
                        {posts.map((postInfo,index)=>
                            <Post key={postInfo.id} postInfo={postInfo} renderPage ={getMyPosts}/>
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


