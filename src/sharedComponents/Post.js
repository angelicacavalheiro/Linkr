import styled from "styled-components";

export default function Post ({postInfo}) {

    

    return(
        <ContainerClass>
            <UserImgAndLikeClass>
                <p>IMAGEM</p>
                <p>LIKE</p>
            </UserImgAndLikeClass>
            <PostContentClass><p>{postInfo.text}</p></PostContentClass>
        </ContainerClass>
    )
}

const ContainerClass = styled.div`
    width: 100%;
    border: 276px;
    background-color: #171717;
    padding:21px 21px;
    border-radius: 16px;
    margin-bottom: 16px;
    color: #FFFFFF;
    word-wrap: wrap w;
    display:flex;
`

const UserImgAndLikeClass = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`

const PostContentClass = styled.div`
    margin-left: 15px;
`