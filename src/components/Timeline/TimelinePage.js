import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles"
import Post from "../../sharedComponents/Post"
import { useContext, useEffect, useState } from "react"
import { getTimelinePosts, getFollowingUsers,getOlderPosts, getEarlierPosts } from "../../Service";
import styled from "styled-components";
import Trending from "../../sharedComponents/Trending";
import TrendingMobile from "../../sharedComponents/TrendingMobile";
import UserContext from "../../contexts/UserContext";
import AddPosts from "./AddPosts";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import ReactTooltip from 'react-tooltip';
import InfiniteScroll from 'react-infinite-scroller';
import AnimationContext from "../../contexts/AnimationContext";
import { motion } from "framer-motion";

export default function TimelinePage () {
    
    const {user} = useContext(UserContext);
    const {disappearMenu} = useContext(ShowMenuContext);
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const [noFollow, setNoFollow] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {pageTransition, pageVariants} = useContext(AnimationContext);
   
    function getFollowersPosts(numFollow) {
        getTimelinePosts(user.token)
        .then((res)=> {
            window.scrollTo(0, 0);
            if(res.data.posts.length === 0 && numFollow > 0){
                setNoPosts(true);
            }
            if(postsList.length <= 10) {
                setHasMore(true)  
            }
            setPostsList(res.data.posts);
            ReactTooltip.rebuild();  
            setLoading(false);
        })
        .catch(()=> {alert('Houve uma falha ao carregar os Posts. Por favor, recarregue a pagina.')
        }); 
    }
    
    function loadPosts(){
        getFollowingUsers(user.token)
        .then(res => {

            if(res.data.users.length < 1) {
                setNoFollow(true);
            };
            getFollowersPosts(res.data.users.length)
        })
    }
    useEffect(()=> {
        loadPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=> {
        if(postsList[0] !== undefined) {
            const intervalRerenderId = setInterval(() => {
                renderEarlierPosts()
               }, 15000);
        
        return () => clearInterval(intervalRerenderId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[postsList]);

    function renderEarlierPosts() {

        if(postsList[0] !== undefined){
            const wasReposted = postsList[0].hasOwnProperty('repostedBy');
            getEarlierPosts(user.token, wasReposted ? postsList[0].repostId : postsList[0].id)
            .then((res)=> {
                if(res.data.posts.length > 0) {
                    setPostsList([...res.data.posts, ...postsList]);
                }  
            })
            .catch(arr => alert('erro ao renderizar earlier Posts'))
        }
    }

    function renderMorePosts(lastPost) {
        const wasReposted = lastPost.hasOwnProperty('repostedBy');
        getOlderPosts(user.token, wasReposted ? lastPost.repostId : lastPost.id)
        .then(res=> {
            setPostsList([...postsList, ...res.data.posts]);
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
            key='timeline-animation'
        >
            <ContainerBoxStyle onClick={disappearMenu}>
                <ContainerCenterStyle>
                    <PageTitleStyle>timeline</PageTitleStyle>
                    <TrendingMobile/>
                    <PostsAndTrendingStyle>
                        <ColunaPostsStyle>
                            {loading ? <LoadingStyle>Loading...</LoadingStyle>
                            :
                            <>
                            <AddPosts loadPosts={loadPosts}/>
                            <NoPostsStyle appear={noPosts}><p>Nenhum post encontrado</p></NoPostsStyle>
                            <NoFollowersStyle appearNoFollow={noFollow}><p>Voc?? n??o segue ningu??m ainda, procure por perfis na busca</p></NoFollowersStyle>
                            {postsList.length !== 0 ? 
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={()=>renderMorePosts(postsList[postsList.length-1])}
                                hasMore={hasMore}
                                loader={<LoadingStyle key={0} >Loading...</LoadingStyle>}
                            >
                                {postsList.length>0 &&
                                <>{postsList.map((post)=> {
                                    const wasReposted = post.hasOwnProperty('repostedBy');
                                return(
                                    <Post key={wasReposted ? post.repostId : post.id} postInfo={post} renderPage={loadPosts}></Post>
                                )
                            })}</>}
                            </InfiniteScroll>
                            :``}
                            </>}
                        </ColunaPostsStyle>
                        <Trending/>
                    </PostsAndTrendingStyle>
                </ContainerCenterStyle>    
            </ContainerBoxStyle> 
        </motion.div>    
    )         
}

const LoadingStyle = styled.p`
    font-size: 40px;
    color: white;
    text-align:center;
`
const NoPostsStyle = styled.div`
    font-size: 40px;
    width: 100%;
    color: white;
    text-align:center;
    display:flex;
    align-items: center;
    margin: 30px 30px;
    display: ${props => props.appear ? "initial" : "none"};
` 
const NoFollowersStyle = styled.div`
    font-size: 40px;
    width: 100%;
    color: white;
    text-align:center;
    display:flex;
    align-items: center;
    margin: 30px 30px;
    display: ${props => props.appearNoFollow ? "initial" : "none"};
` 