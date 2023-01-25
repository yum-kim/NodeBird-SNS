import React from 'react';
import Link from 'next/link';
import propTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
    return (
        <div>
            {/* 게시글 내의 해시태그 추출 */}
            {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if (v.match(/(#[^\s#]+)/g)) {
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                }
                return v;  
            })}
        </div>
    );
};

propTypes.propTypes = {
    postData: propTypes.string.isRequired
}

export default PostCardContent;