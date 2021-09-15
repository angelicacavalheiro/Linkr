import styled from 'styled-components';

export default function Menu(){
    return (
            <MyMenu>
                <Options> 
                <p>My Likes</p> 
                <p>My Posts</p> 
                <p>Logout</p> 
                </Options>
            </MyMenu>                
    )
}

const Options = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center ;
    justify-content: center;
    background: powderblue ;
    width: 100px;
    height: 100px;

    p{
        margin: 10px;
    }
`;

const MyMenu = styled.div`
    display: flex;
   justify-content: flex-end;    
`;
