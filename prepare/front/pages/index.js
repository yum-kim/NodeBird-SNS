import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";


const Home = () => {
    return (
        <>
            <Head>
                <title>메인 | NodeBird</title>
            </Head>
            <AppLayout>
                <div>Hello, Next!</div>
            </AppLayout>
        </>
    );
}

export default Home;