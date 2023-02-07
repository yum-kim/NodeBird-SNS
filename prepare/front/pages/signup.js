import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form , Input, Checkbox, Button } from 'antd';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequestAction } from '../reducers/user';

const Signup = () => {
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, [])

    const { signUpLoading } = useSelector((state) => state.user); 
    const dispatch = useDispatch();

    //onFinish 이벤트에는 e.preventDefault가 자동으로 됨
    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }

        if (!term) {
            return setTermError(true);
        }
        
        dispatch(signupRequestAction({ email, password, nickname }));

    }, [password, passwordCheck, term]);

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
                        <label htmlFor="user-email">이메일</label>
                        <br />
                        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
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
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>모두 동의합니다.</Checkbox>
                        {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                    </div>
                    <div style={{ marginTop : 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>        
        </>
    );
};

export default Signup;