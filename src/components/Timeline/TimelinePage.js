
import { ContainerBoxClass, ContainerCenterClass, ColunaPostsClass, PageTitleClass } from "../../sharedStyles/sharedStyles"
import Post from "../../sharedComponents/Post"
import { useEffect, useState } from "react"
import { getTimelinePosts } from "../../Service";
import styled from "styled-components";


export default function TimelinePage () {
    const [postsList, setPostsList] = useState({});
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);

    useEffect(()=> {
        getTimelinePosts("token")
        .then((res)=> {
            setPostsList(res.data)
            setLoading(false);
            postsList.length === 0 ? setNoPosts(true) : setNoPosts(false)

        })
        .catch(()=> {alert('Houve uma falha ao carregar os Posts. Por favor, recarregue a pagina.')
            setLoading(false)
        });



    }, [])

    let postImprov = {
        posts: [
            {
                id: 2,
                text: "Never Gonna Give You Up #rickroll",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                linkTitle: "Rick Astley - Never Gonna Give You Up (Video)",
                linkDescription: "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
                linkImage: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
                user: {
                    id: 1,
                    username: "teste",
                    avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
                },
                likes: [
                    {
                        id: 1,
                        userId: 1,
                        postId: 2,
                        createdAt: "2021-05-24T18:55:37.544Z",
                        updatedAt: "2021-05-24T18:55:37.544Z",
                        "user.id": 1,
                        "user.username": "teste"
                    }
                ]
            },
            {
                id: 2,
                text: "Never Gonna Give You Up #rickroll",
                link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                linkTitle: "Rick Astley - Never Gonna Give You Up (Video)",
                linkDescription: "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
                linkImage: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
                user: {
                    id: 1,
                    username: "teste",
                    avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
                },
                likes: [
                    {
                        id: 1,
                        userId: 1,
                        postId: 2,
                        createdAt: "2021-05-24T18:55:37.544Z",
                        updatedAt: "2021-05-24T18:55:37.544Z",
                        "user.id": 1,
                        "user.username": "teste"
                    }
                ]
            }
        ]
    }

    return(
        
        <ContainerBoxClass>
            <ContainerCenterClass>
                <ColunaPostsClass>
                    <PageTitleClass>TimeLine</PageTitleClass>

                    <LoadingClass loading={loading}>Loading...</LoadingClass>
                    <NoPostsClass noPosts={noPosts}>Nenhum post encontrado</NoPostsClass>
                    {postImprov.posts.map((post)=> {
                        return(
                            <Post postInfo={post}></Post>
                        )
                    })}
                </ColunaPostsClass>
                <h1>Trending</h1>
            </ContainerCenterClass>    
        </ContainerBoxClass> 
    )         
}

const LoadingClass = styled.p`
    font-size: 40px;
    color: white;
    text-align:center;
    display: ${props => props.loading ? "initial" : "none"};
`

const NoPostsClass = styled.p`
    font-size: 40px;
    color: white;
    text-align:center;
    display: ${props => props.noPosts ? "initial" : "none"};
` 