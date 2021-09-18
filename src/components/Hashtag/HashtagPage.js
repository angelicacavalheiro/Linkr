import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getHashtagPosts} from "../../Service";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import Trending from "../../sharedComponents/Trending";
import ShowMenuContext from '../../contexts/ShowMenuContext';

export default function HashtagPage(){

    const {user} = useContext(UserContext);
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const { hashtag } = useParams();
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("Não há posts com esta #hashtag ")
    const {disappearMenu} = useContext(ShowMenuContext);
   

    useEffect(()=>{
        setNoPosts(false)
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hashtag])


    function getPosts(){
        const promise = getHashtagPosts(user.token, hashtag);
            promise.then((resp)=>{
                setLoading(false)
                setPosts(resp.data.posts) 
                if(resp.data.posts.length === 0){
                    setNoPosts(true);
                }
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

    return(  
    <ContainerBoxStyle onClick={disappearMenu}>
        <ContainerCenterStyle>
            <PageTitleStyle># {hashtag}</PageTitleStyle>
            <PostsAndTrendingStyle>
                <ColunaPostsStyle>
                
                {posts.map((postInfo)=>
                    <Post key={postInfo.id} postInfo={postInfo} renderPage={getPosts}/>
                )}
                {loading ? <LoadingStyle>Loading...</LoadingStyle> : ""}
                {noPosts? <NoPostsStyle>{message} </NoPostsStyle> : ""}
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

