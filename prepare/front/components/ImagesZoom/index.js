import React, { useState } from 'react';
import propTypes from 'prop-types';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Global, Overlay, Header, ImgWrapper, Indicator } from './styles';

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

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
                <Indicator>
                    {currentSlide + 1}
                    {' '}
                    /
                    {images.length}
                </Indicator>
            </div>
        </Overlay>
    );
};

ImagesZoom.propTypes = {
    images: propTypes.arrayOf(propTypes.object).isRequired,
    onClose: propTypes.func.isRequired
}

export default ImagesZoom;