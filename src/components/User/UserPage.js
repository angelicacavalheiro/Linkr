import { ContainerBoxStyle, ContainerCenterStyle, ColunaPostsStyle, PageTitleStyle } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnUserPosts} from "../../Service";
import styled from "styled-components"; 
import UserContext from "../../contexts/UserContext"

export default function UserPage(){
    
    const {user} = useContext(UserContext);
    const [nameUser, setName] = useState("")
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [noPosts, setNoPosts ] = useState(false);
    const [message, setMessage] = useState("ainda não há posts disponiveis");
   
    
   

    useEffect(()=>{
        getUserPosts()
    }, [])


    function getUserPosts(){
        const promise = getAnUserPosts(user.token, id);
            promise.then((resp)=>{
                console.log(resp.data)
                setLoading(false)
                setPosts(resp.data.posts) 
                setName(resp.data.posts[0].user.username)

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
            <ColunaPostsStyle>
                {loading ? "" :<PageTitleStyle>{nameUser}'s posts</PageTitleStyle>}
                {posts.map((postInfo,index)=>
                    <Post key={index} postInfo={postInfo}/>
                )}
                {loading ? <LoadingStyle>Loading...</LoadingStyle> : ""} 
                {noPosts? <NoPostsStyle>{message} </NoPostsStyle> : ""}
            </ColunaPostsStyle>
            
            <h1>Trending</h1>
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