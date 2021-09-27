import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { getLikes, getOlderLikes } from "../../Service";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext"
import Trending from "../../sharedComponents/Trending";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import InfiniteScroll from 'react-infinite-scroller';

export default function MyLikePage(){

    const {user} = useContext(UserContext);
    const [likes, setLikes]= useState([]);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("Você ainda não deu like")
    const {disappearMenu} = useContext(ShowMenuContext);
    const [hasMore, setHasMore] = useState(true)

    useEffect(()=>{
        getPostsLikeAUser()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [    ])


    function getPostsLikeAUser(){
        const promise = getLikes(user.token);
            promise.then((resp)=>{
                
                setLikes(resp.data.posts) 

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
        getOlderLikes(user.token, wasReposted ? lastPost.repostId : lastPost.id)
        .then(res=> {
           
            setLikes([...likes, ...res.data.posts]);
            
            if(res.data.posts.length === 0 ) {
                setHasMore(false);
            }else{setHasMore(true)}
        })
        .catch(err => alert('Nao foi possivel carregar mais posts'))
    }

    return(
    <ContainerBoxStyle onClick={disappearMenu}>
        <ContainerCenterStyle>
             <PageTitleStyle>my likes</PageTitleStyle>
             <PostsAndTrendingStyle>
                 <ColunaPostsStyle>
               
                 {loading ? <LoadingStyle>Loading...</LoadingStyle> 
                 : 
                 noPosts? <NoPostsStyle>{message} </NoPostsStyle> 
                 : 
                 <InfiniteScroll
                            pageStart={0}
                            loadMore={()=>renderMorePosts(likes[likes.length-1])}
                            hasMore={hasMore}
                            loader={<LoadingStyle key={0}>Loading...</LoadingStyle>}
                            
                        >
                            {likes.length>0 &&
                            <>{likes.map((post)=> {
                            return(   
                                <Post key={post.id} postInfo={post} renderPage={getPostsLikeAUser} ></Post>
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


