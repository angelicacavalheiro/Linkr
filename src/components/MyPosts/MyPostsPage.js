import { ContainerBoxClass, ContainerCenterClass, ColunaPostsClass, PageTitleClass } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext, useEffect, useState } from "react";
import { getAnUserPosts, getTimelinePosts } from "../../Service";
//import InfiniteScroll from 'react-infinite-scroller';
// import { useContext } from "react";
// import UserContext from

export default function MyPostPage(){
    const token = "b1c3ac55-500a-47fc-82eb-8ac8b2595428";
    const id = 492;
    const [posts, setPosts]= useState([]);
    const name = "AnUser";
    
    //const {token, MyID} = useContext(UserContext);

    useEffect(()=>{
        getMyPosts()
    }, [])

    function getMyPosts(){

        //const promise = getAnUserPosts(token, id);
        const promise = getTimelinePosts(token);
        promise.then((resp)=>{
            console.log(resp.data)
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
                <Post></Post>
                {/* <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={true || false}
            // loader={<div className="loader" key={0}>Loading ...</div>}
            // useWindow={false}
            // getScrollParent={() => this.scrollParentRef}
        >
        </InfiniteScroll> */}
                
            </ColunaPostsClass>
            
            <h1>Trending</h1>
        </ContainerCenterClass>
    </ContainerBoxClass>
    
        
    );
}