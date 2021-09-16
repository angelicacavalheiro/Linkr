import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle, PostsAndTrendingStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { getAnUserPosts} from "../../Service";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext"
import Trending from "../../sharedComponents/Trending";

export default function MyPostPage(){

    const {user} = useContext(UserContext);
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("Você ainda não tem posts")
    
    
    console.log(user)
   

    useEffect(()=>{
        getMyPosts()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function getMyPosts(){
        const promise = getAnUserPosts(user.token, user.id);
        console.log(user.token , user.id)
            promise.then((resp)=>{
                console.log(resp.data)
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
    <ContainerBoxStyle>
        <ContainerCenterStyle>
             <PageTitleStyle>my posts</PageTitleStyle>
             <PostsAndTrendingStyle>
                 <ColunaPostsStyle>
               
                {posts.map((postInfo,index)=>
                    <Post key={index} postInfo={postInfo}/>
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