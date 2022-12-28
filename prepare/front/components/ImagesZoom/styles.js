import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;   
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5000;
    background-color: black;
    text-align: center;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    & h1 {
        color: white;
    }
`;

export const ImgWrapper = styled.div`
    padding: 30px;

    & img {
        max-width: 100%;
        margin: 0 auto;
    }
`;

export const Indicator = styled.div`
    color: white;
    background-color: #888;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 10px;

`;