import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;  
`;

const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .ant-col:first-child {
        padding-left: 0 !important;
    }

    .ant-col:last-child {
        padding-right: 0 !important;
    }
`;

const AppLayout = ({ children }) => {
    const { logInDone, logOutDone } = useSelector((state) => state.user);
    const items = [
        {
            label: <Link href="/"><a>메인</a></Link>,
            key: 'main'
        },
        {
            label: <Link href="/profile"><a>프로필</a></Link>,
            key: 'profile'
        },
        {
            label: <SearchInput />,
            key: 'search'
        },
        {
            label: <Link href="/signup"><a>회원가입</a></Link>,
            key: 'signup'
        }
    ];

    return (
        <div>
            <Global />
            <Menu mode="horizontal" items={items} />
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {logInDone ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/yum-kim/NodeBird-SNS" target="_blank" rel="noopener noreferrer">Github</a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: propTypes.node.isRequired,
};

export default AppLayout;