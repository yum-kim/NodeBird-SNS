import React from 'react';
import propTypes from 'prop-types';
import PostCard from './PostCard';

const PostImages = ({ images }) => {
    return (
        <div>
            구현중
        </div>
    );
};

PostImages.propTypes = {
    images: propTypes.arrayOf(propTypes.object),
}

export default PostImages;