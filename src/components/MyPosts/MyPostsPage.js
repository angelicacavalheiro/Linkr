import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { getAnUserPosts, getOlderMyPosts} from "../../Service";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext"
import Trending from "../../sharedComponents/Trending";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import InfiniteScroll from 'react-infinite-scroller';
import AnimationContext from "../../contexts/AnimationContext";
import { motion } from "framer-motion";

export default function MyPostPage(){

    const {user} = useContext(UserContext);
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("Você ainda não tem posts")
    const {disappearMenu} = useContext(ShowMenuContext);
    const [hasMore, setHasMore] = useState(true)
    const { pageTransition, pageVariants } = useContext(AnimationContext);
   

    useEffect(()=>{
        getMyPosts()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [    ])


    function getMyPosts(){
        const promise = getAnUserPosts(user.token, user.id);
            promise.then((resp)=>{
                window.scrollTo(0, 0);
                let justMyposts = resp.data.posts.filter((post)=> post.user.id === user.id)
                setPosts(justMyposts) 
                if(resp.data.posts.length === 0){
                    setNoPosts(true);
                }
                setHasMore(true)
                setLoading(false)
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

    function renderMorePosts(lastPost) {
        const wasReposted = lastPost.hasOwnProperty('repostedBy');
        getOlderMyPosts(user.token,user.id, wasReposted ? lastPost.repostId : lastPost.id)
        .then(res=> {
           
            setPosts([...posts, ...res.data.posts]);
            
            if(res.data.posts.length === 0) {
                setHasMore(false);
            }else{setHasMore(true)}
        })
        .catch(err => alert('Nao foi possivel carregar mais posts'))
    }

    return(
    <motion.div 
        initial='out' animate='in' exit = 'out' 
        variants={pageVariants} transition={pageTransition} 
        key='my-posts-animation'
    >
        <ContainerBoxStyle onClick={disappearMenu}>
            <ContainerCenterStyle>
                <PageTitleStyle>my posts</PageTitleStyle>
                <PostsAndTrendingStyle>
                    <ColunaPostsStyle>
                    {loading ? <LoadingStyle>Loading...</LoadingStyle> 
                    : 
                    noPosts? <NoPostsStyle>{message} </NoPostsStyle> 
                    : 
                    <InfiniteScroll
                                pageStart={0}
                                loadMore={()=>renderMorePosts(posts[posts.length-1])}
                                hasMore={hasMore}
                                loader={<LoadingStyle key={0}>Loading...</LoadingStyle>}
                                
                            >
                                {posts.length>0 &&
                                <>{posts.map((post)=> {
                                return(   
                                    <Post key={post.id} postInfo={post} renderPage={getMyPosts} ></Post>
                                )
                            })}</>}
                    </InfiniteScroll>
                    } 

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


