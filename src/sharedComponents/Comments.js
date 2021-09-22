import Comment from "./Comment";
import styled from "styled-components";
import SendComment from "./SendComment";

export default function Comments({comments, seeComments,user, id}){
    return(
        <CommentBoxStyle>
            {seeComments? <>
                            {comments.map((comment)=> <Comment key={comment.id} comment={comment} user={user}/>)}
                            <WriteCommentStyled>
                               <SendComment  id={id} />
                            </WriteCommentStyled>
                          </>
                        :
                            ""
                        }
        </CommentBoxStyle>
    )
}

const CommentBoxStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        background-color: #252525;
        color: #ffffff;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        width: 80%;
        margin: 10px 0px;
        height: 40px;
        border: none;
        padding-left: 13px;
    }
    input::placeholder{
        color: #575757;
        font-style: italic;
        font-size: 14px;
    }
`
const WriteCommentStyled = styled.div`
    display: flex;
    width:100%;
    align-items: center;
    margin-bottom: 10px;

    img{
        border-radius: 100%;
        width: 39px;
        height: 39px;
        margin-left: 20px;
        margin-right: 15px;
    }

`