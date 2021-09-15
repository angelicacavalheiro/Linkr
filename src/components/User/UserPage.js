import { ContainerBoxClass, ContainerCenterClass, ColunaPostsClass, PageTitleClass } from "../../sharedStyles/sharedStyles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAnUserPosts} from "../../Service";
// import UserContext from

export default function UserPage(){
    const token = "b1c3ac55-500a-47fc-82eb-8ac8b2595428";
     //const {token} = useContext(UserContext);
    const [nameUser, setName] = useState("")
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    
   

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
            })
    }





    return(
    <ContainerBoxClass>
        <ContainerCenterClass>
            <ColunaPostsClass>
                <PageTitleClass>{nameUser}'s posts</PageTitleClass>
                {posts.map((post,index)=>
                    <Post key={index} post={post}/>
                )}
                {loading? <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                 />: ""}
                
            </ColunaPostsClass>
            
            <h1>Trending</h1>
        </ContainerCenterClass>
    </ContainerBoxClass>
    
        
    );
}
