import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles"
import Post from "../../sharedComponents/Post"
import { useContext, useEffect, useState } from "react"
import { getTimelinePosts, getFollowingUsers,getOlderPosts } from "../../Service";
import styled from "styled-components";
import Trending from "../../sharedComponents/Trending";
import UserContext from "../../contexts/UserContext";
import AddPosts from "./AddPosts";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import ReactTooltip from 'react-tooltip';
import InfiniteScroll from 'react-infinite-scroller';


export default function TimelinePage () {
    
    const {user} = useContext(UserContext);
    const {disappearMenu} = useContext(ShowMenuContext);
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const [noFollow, setNoFollow] = useState(false);
    const [lastPostId, setLastPostId] = useState(0);
    const [hasMore, setHasMore] = useState(true)
    
   
    function getFollowersPosts(numFollow) {
        
        getTimelinePosts(user.token)
        .then((res)=> {
            
            if(res.data.posts.length === 0 && numFollow > 0){
                setNoPosts(true);
            }
            if(postsList.length<10) {
            //    setLastPostId(res.data.posts[res.data.posts.length-1].id);
            }
            
            setPostsList(res.data.posts);
            ReactTooltip.rebuild();  
            console.log(lastPostId);
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
        const intervalRerenderId = setInterval(() => {
          //  renderMorePosts();
        }, 15000);
 
        return () => clearInterval(intervalRerenderId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
   
    function renderMorePosts() {
        
        console.log({lastPostId});
        getOlderPosts(user.token, lastPostId)
        .then(res=> {
            setPostsList([...postsList, ...res.data.posts]);
            //setLastPostId(res.data.posts[res.data.posts.length-1].id);
            setHasMore(false);
            console.log(postsList)
        })
        .catch(err => alert('Nao foi possivel carregar mais posts'))
        
    }


    return(
        <ContainerBoxStyle onClick={disappearMenu}>
            <ContainerCenterStyle>
                <PageTitleStyle>timeline</PageTitleStyle>
                <PostsAndTrendingStyle>
                    <ColunaPostsStyle>
                        {loading ? <LoadingStyle>Loading...</LoadingStyle>
                        :
                        <>
                        <AddPosts loadPosts={loadPosts}/>
                        <NoPostsStyle appear={noPosts}><p>Nenhum post encontrado</p></NoPostsStyle>
                        <NoFollowersStyle appearNoFollow={noFollow}><p>Você não segue ninguém ainda, procure por perfis na busca</p></NoFollowersStyle>
                        
                         <InfiniteScroll
                            pageStart={0}
                            loadMore={renderMorePosts}
                            hasMore={true}
                            loader={<LoadingStyle>Loading...</LoadingStyle>}
                            
                        >
                            {postsList.length>0 &&
                            <>{postsList.map((post)=> {
                            return(   
                                <Post key={post.id} postInfo={post} renderPage={loadPosts} setLastPostId={setLastPostId}></Post>
                            )
                        })}</>}
                        </InfiniteScroll>
                         
                        </>}
                        
                    </ColunaPostsStyle>
                    <Trending/>
                </PostsAndTrendingStyle>
            </ContainerCenterStyle>    
        </ContainerBoxStyle> 
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