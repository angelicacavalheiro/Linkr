import { ContainerBoxClass, ContainerCenterClass, ColunaPostsClass, PageTitleClass } from "../../sharedStyles/sharedStyles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnUserPosts} from "../../Service";
import styled from "styled-components";
// import UserContext from

export default function UserPage(){
    const token = "b1c3ac55-500a-47fc-82eb-8ac8b2595428";
     //const {token} = useContext(UserContext);
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
        const promise = getAnUserPosts(token, id);
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
    <ContainerBoxClass>
        <ContainerCenterClass>
            <ColunaPostsClass>
                {loading ? "" :<PageTitleClass>{nameUser}'s posts</PageTitleClass>}
                {posts.map((postInfo,index)=>
                    <Post key={index} postInfo={postInfo}/>
                )}
                {loading ? <LoadingStyle>Loading...</LoadingStyle> : ""} 
                {noPosts? <NoPostsStyle>{message} </NoPostsStyle> : ""}
            </ColunaPostsClass>
            
            <h1>Trending</h1>
        </ContainerCenterClass>
    </ContainerBoxClass>
    
        
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