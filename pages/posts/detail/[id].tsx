import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { loginRoute, postRoute, updatepostRoute, detailpostRoute } from '../../../utils/APIRoutes';
import Header from './../../../components/Header';

import {
    FacebookShareButton,
    FacebookIcon,
} from 'next-share';
import { PostDetailCommentType, PostDetailType } from '../../../lib/types/post';


function Detail() {
    const [currentPost, setCurrentPost] = useState<PostDetailType>();
    const [comments, setComments] = useState({ comment: "" });
    const [allComments, setAllComments] = useState<PostDetailCommentType[]>();

    const inputref = useRef<HTMLInputElement>(null);


    const router = useRouter();
    console.log("routerr", router.query.id);
    const idRoute = router.query.id;

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${detailpostRoute}/${router.query.id}`);
            console.log("data111111", data.data.checkPost);
            console.log("alll commetdsadddddd", data.data.commentSent);
            const data1 = await axios.patch(`${detailpostRoute}/${router.query.id}`, data.data.checkPost);
            setAllComments(data.data.commentSent);
            setCurrentPost(data1.data);
        }
        fetchData();
    }, [idRoute]);

    console.log("currentPost", currentPost);

    const handleIncrementLike = async () => {
        const data = await axios.get(`${detailpostRoute}/${router.query.id}`);
        console.log("data likeee", data);
        const data2 = await axios.put(`${detailpostRoute}/${router.query.id}`, data.data.checkPost);
        setCurrentPost(data2.data);
    }
    console.log("sssssssssssssss", typeof currentPost?.updatedAt);

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        console.log('commented');
        const { data } = await axios.post(`${detailpostRoute}/${router.query.id}`, comments);
        console.log("comment", data);
        setAllComments(data);
        event.target.reset();
    }

    const handleChange = (e : any) => {
        console.log("e", e.target.value);
        setComments({ ...comments, [e.target.name]: e.target.value });
    }
    let d;
    let date;
    if(currentPost){
        d = new Date(currentPost.createdAt);
        date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
    }else{
        date = ""
    }
    return (
        <div>
            <Header />
            <div
                className='w-full p-8 flex flex-col justify-between h-auto overflow-auto lg:h-auto'
            >
                <div className="flex gap-1">
                    <h1 className='text-left text-3xl font-bold leading-normal'>
                        {currentPost?.title}
                    </h1>
                    <span className="text-emerald-300 bg-green-600 h-8 rounded-md">{currentPost?.category}</span>
                </div>
                <div className='text-sm gap-4 flex'>
                    {currentPost?.content}
                </div>
                <span className='text-gray-800 font-bold'>{currentPost?.author?.name} <span className='text-gray-600 font-normal'>{" "}{date}</span></span>

                <div className='flex gap-4'>
                    <div className="text-red-600 text-xl flex items-center gap-2">
                        <div className="cursor-pointer" onClick={() => handleIncrementLike()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                            </svg>
                        </div>
                        {currentPost?.likes}
                    </div>
                    <div className="text-gray-800 flex text-xl items-center gap-2">
                        <div className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        {currentPost?.views}
                    </div>

                    <div className="text-gray-800 flex text-xl items-center gap-2">
                        <div className="cursor-pointer">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                            </svg> */}

                            <FacebookShareButton
                                url={`https://github.com/posts/detail/${currentPost?.id}`}
                                quote={'next-share is a social share buttons for your next React apps.'}
                                hashtag={'#nextshare'}
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 w-[50%] h-auto p-4 rounded-md ml-8">
                {allComments && allComments.length > 0 ? allComments.map((item, key) => (
                    <span className="">
                        <h1 className="font-bold">{item.authorComment}</h1>
                        <h2 className="">{item.content}</h2>
                        <h2 className="">{new Date(item.createdAt).getHours() + ":" + new Date(item.createdAt).getMinutes() + ", " + new Date(item.createdAt).toDateString()}</h2>
                    </span>
                ))
                    : <div>
                        comment post below
                    </div>
                }
            </div>

            <div className="p-8">
                <form
                    onSubmit={(event) => handleSubmit(event)}
                    className='flex gap-2 justify-center mt-4 w-[50%]'
                >
                    <input
                        className='bg-slate-50 p-1 border-sky-300 border-2 rounded-md w-full font-md focus:border-sky-500 focus:outline-none'
                        placeholder='Comment'
                        name='comment'
                        ref={inputref}
                        onChange={(e) => handleChange(e)}
                    />
                    <button
                        className='bg-gray-600 z-10 create-button uppercase font-black text-sm p-2 rounded-md text-slate-200 transition'
                        type='submit'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Detail;