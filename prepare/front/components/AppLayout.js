import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';

const AppLayout = ({ children }) => {
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
            label: <Link href="/signup"><a>회원가입</a></Link>,
            key: 'signup'
        }
    ];

    return (
        <div>
            <Menu mode="horizontal" items={items} />
            {children}
        </div>
    )
}

AppLayout.propTypes = {
    children: propTypes.node.isRequired,
};

export default AppLayout;