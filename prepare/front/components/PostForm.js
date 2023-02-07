import React, { useCallback, useState, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        console.log(imageInput.current);
        imageInput.current.click();
    }, [imageInput.current]);
    const { imagePaths } = useSelector((state) => state.post);
    const [text, setText] = useState('');
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);
    const dispatch = useDispatch();
    const onSubmit = useCallback(() => {
        dispatch(addPost);
        setText('');
    }, []);

    return (
        <Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder='어떤 신기한 일이 있었나요?'
                style={{ marginBottom: '10px' }}
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{ float: 'right' }} htmlType='submit'>게시물 올리기</Button>
            </div>
            <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={v} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button>업로드 취소</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
};

export default PostForm;