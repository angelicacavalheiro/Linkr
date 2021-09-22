import styled from "styled-components"

export default function Comments(props){
    const {id, text, user} = props.comment;

    return(
        <>
        <Comment>
            <img src={user.avatar} alt=""/>
            <div>
                <UserInfo>
                    <h5>{user.username}</h5>
                    <span>• following</span>
                </UserInfo>
                <p>
                {text}
                </p>
            </div>  
        </Comment>
        <Border />
        </>
    )
}


const Comment = styled.div`
    width: 100%;
    height: auto;
    color: #ffffff;
    padding-left: 10px;
    margin-top: 10px;
    display: flex;
   

    img{
        height: 50px;
        width: 50px;
        border-radius: 100%;
        margin-right: 15px;
        margin-left: 20px;
    }
    p{
        color: #ACACAC;
        font-size: 14px;
        margin-right: 13px;
    }
   
`
const UserInfo = styled.div`
    display: flex;
    font-size: 14px;
    width: auto;
    height: auto;
    margin-bottom: 10px;

        h5{
            color: #F3F3F3;
            font-weight: 700;
        }
        span{
            color: #565656;
            margin-left: 7px;
        }

`
const Border =styled.div`
    height: 1px;
    width: 95%;
    background-color: #353535;
    margin-top: 15px;
    margin-bottom: 15px;


`