import { ContainerBoxClass, ContainerCenterClass, ColunaPostsClass, PageTitleClass } from "../../sharedStyles/sharedStyles";
import Post from "../../sharedComponents/Post";
import { useContext } from "react";
// import { useContext } from "react";
// import UserContext from

export default function MyPostPage(){

    //const {token, user.id} = useContext(UserContext);









    return(
    <ContainerBoxClass>
        <ContainerCenterClass>
            <ColunaPostsClass>
                <PageTitleClass>my posts</PageTitleClass>
                <Post></Post>
                
            </ColunaPostsClass>
            
            <h1>Trending</h1>
        </ContainerCenterClass>
    </ContainerBoxClass>
    
        
    );
}