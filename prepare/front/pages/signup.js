import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form , Input, Button } from 'antd';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => { 
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const onSubmit = useCallback(() => {

    }, []);

    const ErrorMessage = styled.div`
        color: red;
    `;

    return (
        <>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br />
                        <Input name="user-id" value={id} onChange={onChangeId} required />
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임</label>
                        <br />
                        <Input name="user-nick" value={nickname} onChange={onChangeNickname} required />
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br />
                        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
                    </div>
                    <div>
                        <label htmlFor="user-password-check">비밀번호체크</label>
                        <br />
                        <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required />
                        {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    </div>
                </Form>
            </AppLayout>        
        </>
    );
};

export default Signup;