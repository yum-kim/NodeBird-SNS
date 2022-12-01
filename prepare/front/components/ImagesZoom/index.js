import React, { useState } from 'react';
import propTypes from 'prop-types';
import Slick from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const Overlay = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5000;
        background-color: black;
        text-align: center;
    `;

    const Header = styled.header`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;

        & h1 {
            color: white;
        }
    `;

    const ImgWrapper = styled.div`
        padding: 30px;

        & img {
            max-width: 100%;
            margin: 0 auto;
        }
    `;

    return (
        <Overlay>
            <Header>
                <h1>상세 이미지</h1>
                <button onClick={onClose}>X</button>
            </Header>
            <div>
                <div>
                    <Slick
                        initialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v) => (
                            <ImgWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                </div>
            </div>
        </Overlay>
    );
};

ImagesZoom.propTypes = {
    images: propTypes.arrayOf(propTypes.object).isRequired,
    onClose: propTypes.func.isRequired
}

export default ImagesZoom;