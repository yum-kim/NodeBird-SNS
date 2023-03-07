import React, { useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { Content } from 'antd/lib/layout/layout';
import { Card, Image, Popover, Button, List, Avatar, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { deletePost } from '../reducers/post';

const PostCard = ({ post }) => {
    const id = useSelector((state) => state.user.me?.id);
    const [liked, setLiked] = useState(false);
    const [commentFormOpend, setCommentFormOpend] = useState(false);
    const onToggleLike = useCallback((prev) => {
        setLiked((prev) => !prev);
    }, []);
    const onToggleComment = useCallback((prev) => {
        setCommentFormOpend((prev) => !prev);
    }, []);

    const { deletePostLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const onDeletePost = () => {
        dispatch(deletePost({ postId: post.id }));
    }

    return (
        <div style={{ marginBottom: 15 }}>
            <Card
                cover={post.Images?.[0] && <PostImages images={post.Images} />}
                actions={[
                        <RetweetOutlined key="retweet" />,

                    liked
                        ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                        <MessageOutlined key="comment" onClick={onToggleComment} />,
                        <Popover key="more" content={(
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger" onClick={onDeletePost} loading={deletePostLoading}>삭제</Button>
                                    </> 
                                ) : <Button>신고</Button>
                                }
                            </Button.Group>
                        )}>
                        <EllipsisOutlined />
                        </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    // description={post.content}
                    description={<PostCardContent postData={post.content} />}
                >
                </Card.Meta>

                <Image />
                <Content />
            </Card>

            {commentFormOpend && (
                <>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    );
};

PostCard.propTypes = {
    post: propTypes.shape({
        id: propTypes.number,
        User: propTypes.object,
        content: propTypes.string,
        createAt: propTypes.object,
        Comments: propTypes.arrayOf(propTypes.object),
        Images: propTypes.arrayOf(propTypes.object),
    }).isRequired
};

export default PostCard;