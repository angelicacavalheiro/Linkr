import { ContainerBoxClass, ContainerCenterClass, ColunaPostsClass, PageTitleClass } from "../../sharedStyles/sharedStyles";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { getAnUserPosts} from "../../Service";
// import UserContext from

export default function MyPostPage(){
    const token = "b1c3ac55-500a-47fc-82eb-8ac8b2595428";
    const id = 492;
    const [posts, setPosts]= useState([]);
    const [loading, setLoading] = useState(true)
    const name = "AnUser";
    
    //const {token, MyID} = useContext(UserContext);

    useEffect(()=>{
        getMyPosts()
    }, [])

    function getMyPosts(){

        const promise = getAnUserPosts(token, id);
        promise.then((resp)=>{
            console.log(resp.data)
            setLoading(false)
            setPosts(resp.data.posts)
        })
    }





    return(
    <ContainerBoxClass>
        <ContainerCenterClass>
            <ColunaPostsClass>
                <PageTitleClass>my posts</PageTitleClass>
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

