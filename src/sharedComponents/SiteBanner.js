import styled from "styled-components";

export default function SiteBanner(){
    return(
        <SiteBannerStyled>
            <TitleStyled>
                linkr
            </TitleStyled>
            <SloganStyled>
                save, share and discover the best links on the web
            </SloganStyled>
        </SiteBannerStyled>
    );
}

const SiteBannerStyled = styled.div`
    height: 100vh;
    width: 63%;
    background-color: #151515;
    padding: 300px 0 0 10%;

    @media(max-width: 614px){
        width: 100%;
        height: auto;
        padding: 10px 60px;
        text-align: center;
    }
`;

const TitleStyled = styled.p`
    font-family: 'Passion One', sans-serif;
    font-size: 106px;
    font-weight: 700;
    color: #FFF;
   
    @media(max-width: 614px){
        width: 100%;
        font-size: 76px;
    }
`;

const SloganStyled = styled.p`
    width: 50%;
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: 700;
    color: #FFF;
    line-height: 60px;
    
    @media(max-width: 614px){
        width: 100%;
        font-size: 23px;
        line-height: 28px;
    }
`;