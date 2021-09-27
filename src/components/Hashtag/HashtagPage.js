import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getHashtagPosts, getOlderHashtags} from "../../Service";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import Trending from "../../sharedComponents/Trending";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import ReactTooltip from 'react-tooltip';
import InfiniteScroll from 'react-infinite-scroller';

export default function HashtagPage(){

    const {user} = useContext(UserContext);
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const { hashtag } = useParams();
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("Não há posts com esta #hashtag ")
    const {disappearMenu} = useContext(ShowMenuContext);
   const [hasMore, setHasMore] = useState(true)
    useEffect(()=>{
        setNoPosts(false)
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hashtag])


    function getPosts(){
        const promise = getHashtagPosts(user.token, hashtag);
            promise.then((resp)=>{
                setPosts(resp.data.posts) 
                ReactTooltip.rebuild()
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
        getOlderHashtags(user.token, hashtag, wasReposted ? lastPost.repostId : lastPost.id)
        .then(res=> {
           
            setPosts([...posts, ...res.data.posts]);
            
            if(res.data.posts.length === 0) {
                setHasMore(false);
            }else{setHasMore(true)}
        })
        .catch(err => alert('Nao foi possivel carregar mais posts'))
    }

    return(  
    <ContainerBoxStyle onClick={disappearMenu}>
        <ContainerCenterStyle>
            <PageTitleStyle># {hashtag}</PageTitleStyle>
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
                                <Post key={post.id} postInfo={post} renderPage={getPosts} ></Post>
                            )
                        })}</>}
                </InfiniteScroll>
                 } 
            </ColunaPostsStyle>
            
           <Trending />
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

