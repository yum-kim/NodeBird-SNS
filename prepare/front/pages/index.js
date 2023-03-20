import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Home = () => {
    const { logInDone } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: LOAD_POST_REQUEST });
    }, [])

    useEffect(() => {
        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostLoading) {
                    dispatch({ type: LOAD_POST_REQUEST });
                }
            }
        }
        window.addEventListener('scroll', onScroll);

        //useEffect에서 event listener사용 시 return 시에 이벤트 해제해주지 않으면 메모리에 누적됨!!!
        return () => {
            window.removeEventListener('scroll', onScroll);
        }

    }, [hasMorePosts, loadPostLoading])

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