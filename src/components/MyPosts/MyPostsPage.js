import { ContainerBoxClass, ContainerCenterClass, ColunaPostsClass, PageTitleClass } from "../../sharedStyles/sharedStyles";

export default function MyPostPage(){

    return(
    <ContainerBoxClass>
        <ContainerCenterClass>
            <ColunaPostsClass>
                <PageTitleClass>my posts</PageTitleClass>
                
            </ColunaPostsClass>
            
            <h1>Trending</h1>
        </ContainerCenterClass>
    </ContainerBoxClass>
    
        
    );
}