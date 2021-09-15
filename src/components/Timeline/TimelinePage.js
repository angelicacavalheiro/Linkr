
import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle } from "../../sharedStyles/sharedStyles"
import Post from "../../sharedComponents/Post"
import { useEffect, useState } from "react"
import { getTimelinePosts } from "../../Service";
import styled from "styled-components";
import Trending from "../../sharedComponents/Trending";

export default function TimelinePage () {
    const [postsList, setPostsList] = useState({});
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const token = "8284f936-9148-4604-8114-4f64f5920ce9"
    useEffect(()=> {
        getTimelinePosts(token)
        .then((res)=> {
            setPostsList(res.data)
            setLoading(false);
            postsList.length === 0 ? setNoPosts(true) : setNoPosts(false)
            console.log(postsList)
        })
        .catch(()=> {alert('Houve uma falha ao carregar os Posts. Por favor, recarregue a pagina.')
            setLoading(false)
        });



    }, [])

 

    return(
        
        <ContainerBoxStyle>
            <ContainerCenterStyle>
                <ColunaPostsStyle>
                    <PageTitleStyle>TimeLine</PageTitleStyle>
                    {loading ? <LoadingStyle>Loading...</LoadingStyle>
                    :
                    <>
                    <NoPostsStyle noPosts={noPosts}>Nenhum post encontrado</NoPostsStyle>
                    {postsList.posts.map((post, index)=> {
                        return(
                            <Post key={index}postInfo={post}></Post>
                        )
                    })}</>}
                </ColunaPostsStyle>
                <Trending></Trending>
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
