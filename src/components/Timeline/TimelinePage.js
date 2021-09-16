
import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles"
import Post from "../../sharedComponents/Post"
import { useContext, useEffect, useState } from "react"
import { getTimelinePosts } from "../../Service";
import styled from "styled-components";
import Trending from "../../sharedComponents/Trending";
import UserContext from "../../contexts/UserContext";
import AddPosts from "./AddPosts";

export default function TimelinePage () {
    const {user} = useContext(UserContext);
    const [postsList, setPostsList] = useState({});
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);

    function loadPosts(){
        getTimelinePosts(user.token)
        .then((res)=> {
            setPostsList(res.data)
            setLoading(false);
            postsList.length === 0 ? setNoPosts(true) : setNoPosts(false)
        })
        .catch(()=> {alert('Houve uma falha ao carregar os Posts. Por favor, recarregue a pagina.')
        }); 
    }

    useEffect(()=> {
        loadPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return(
        <ContainerBoxStyle>
            <ContainerCenterStyle>

                <PageTitleStyle>TimeLine</PageTitleStyle>
                <PostsAndTrendingStyle>
                    <ColunaPostsStyle>
                        {loading ? <LoadingStyle>Loading...</LoadingStyle>
                        :
                        <>
                        <AddPosts loadPosts={loadPosts}/>
                        <NoPostsStyle noPosts={noPosts}>Nenhum post encontrado</NoPostsStyle>
                        {postsList.posts.map((post, index)=> {
                            return(
                                <Post key={index}postInfo={post}></Post>
                            )
                        })}</>}
                    </ColunaPostsStyle>
                    <Trending></Trending>
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
const NoPostsStyle = styled.p`
    font-size: 40px;
    color: white;
    text-align:center;
    display: ${props => props.noPosts ? "initial" : "none"};
` 
