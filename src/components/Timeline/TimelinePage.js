import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles"
import Post from "../../sharedComponents/Post"
import { useContext, useEffect, useState } from "react"
import { getTimelinePosts } from "../../Service";
import styled from "styled-components";
import Trending from "../../sharedComponents/Trending";
import TrendingMobile from "../../sharedComponents/TrendingMobile";
import UserContext from "../../contexts/UserContext";
import AddPosts from "./AddPosts";
import ShowMenuContext from '../../contexts/ShowMenuContext';
import AnimationContext from "../../contexts/AnimationContext";
import { motion } from "framer-motion";

export default function TimelinePage () {
    
    const {user} = useContext(UserContext);
    const {disappearMenu} = useContext(ShowMenuContext);
    const [postsList, setPostsList] = useState({});
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const {pageTransition} = useContext(AnimationContext);

    function loadPosts(){
        getTimelinePosts(user.token)
        .then((res)=> {
            setLoading(false);
            postsList.length === 0 ? setNoPosts(true) : setNoPosts(false);
            setPostsList(res.data);
        })
        .catch(()=> {alert('Houve uma falha ao carregar os Posts. Por favor, recarregue a pagina.')
        }); 
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
        <motion.div initial='out' animate='in' exit = 'out' variants={pageTransition}>
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
                            <NoPostsStyle noPosts={noPosts}>Nenhum post encontrado</NoPostsStyle>
                            {"posts" in postsList && 
                                <>{postsList.posts.map((post)=> {
                                    const wasReposted = post.hasOwnProperty('repostedBy');
                                return(
                                    <Post key={wasReposted ? post.repostId : post.id} postInfo={post} renderPage={loadPosts}></Post>
                                )
                            })}</>}</>}
                            
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
const NoPostsStyle = styled.p`
    font-size: 40px;
    color: white;
    text-align:center;
    display: ${props => props.noPosts ? "initial" : "none"};
` 
