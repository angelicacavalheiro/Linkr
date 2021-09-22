import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles"
import Post from "../../sharedComponents/Post"
import { useContext, useEffect, useState } from "react"
import { getTimelinePosts, getFollowingUsers } from "../../Service";
import styled from "styled-components";
import Trending from "../../sharedComponents/Trending";
import UserContext from "../../contexts/UserContext";
import AddPosts from "./AddPosts";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import ReactTooltip from 'react-tooltip';

export default function TimelinePage () {
    
    const {user} = useContext(UserContext);
    const {disappearMenu, setFollowing} = useContext(ShowMenuContext);
    const [postsList, setPostsList] = useState({});
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const [noFollow, setNoFollow] = useState(false);
   
    function getFollowersPosts(numFollow) {
        
        getTimelinePosts(user.token)
        .then((res)=> {
            
            if(res.data.posts.length === 0 && numFollow > 0){
                setNoPosts(true);
            }
            setPostsList(res.data);
            ReactTooltip.rebuild();  
        })
        .catch(()=> {alert('Houve uma falha ao carregar os Posts. Por favor, recarregue a pagina.')
        }); 
    }
    
    function loadPosts(){
        getFollowingUsers(user.token)
        .then(res => {

            setLoading(false);
            if(res.data.users.length < 1) {
                setNoFollow(true);
            };
            getFollowersPosts(res.data.users.length)
            setFollowing(res.data.users)
        })
    }

    useEffect(()=> {
        loadPosts()
        
        const intervalRerenderId = setInterval(() => {
            loadPosts();
        }, 15000);
 
        return () => clearInterval(intervalRerenderId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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
                        {"posts" in postsList && 
                            <>{postsList.posts.map((post)=> {
                            return(
                                <Post key={post.id} postInfo={post} renderPage={loadPosts}></Post>
                            )
                        })}</>}</>}
                        
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