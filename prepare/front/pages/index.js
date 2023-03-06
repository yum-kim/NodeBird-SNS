import React from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

const Home = () => {
    const { logInDone } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post); //or const mainPosts = useSelector((state) => state.post.mainPosts);

    return (
        <>
            <Head>
                <title>메인 | NodeBird</title>
            </Head>
            <AppLayout>
                {logInDone && <PostForm />}
                {mainPosts.map((post) => <PostCard key={post.id} post={post} /> )}
            </AppLayout>
        </>
    );
}

export default Home;