import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const CommentForm = ({ post }) => {
    const id = useSelector((state) => state.user.me?.id);
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText])

    return (
        <Form onFinish={onSubmitComment} style={{ marginTop: 10 }}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">올리기</Button>
            </Form.Item>
        </Form>
    );
};

export default CommentForm;