import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Link from "next/link";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes.js";
import { postRoute } from "./../utils/APIRoutes";
import { PostType } from "../lib/types/post";

function HomePage() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [value, setValue] = useState({
        search: "",
        category: "all",
    });
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(
                `${postRoute}?title=${value.search}&category=${value.category}`
            );
            setPosts(data.data);
        };
        fetchData();
    }, []);

    const handleChangeSearch = (e : any) => {
        console.log(e.target.value);
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        const data = await axios.get(
            `${postRoute}?title=${value.search}&category=${value.category}`
        );
        setPosts(data.data);
    };

    return (
        <div className='px-2'>
            <Header></Header>
            <div className='px-8 mt-4'>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'>
                        Search
                    </label>
                    <div className='relative flex'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                            <svg
                                aria-hidden='true'
                                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                ></path>
                            </svg>
                        </div>
                        <input
                            type='search'
                            name='search'
                            className='block p-4 pl-10 w-[88%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='Search title...'
                            onChange={(e) => handleChangeSearch(e)}
                        />
                        {posts && posts.length > 0 ? (
                            <select
                                name='category'
                                onChange={(e) => handleChangeSearch(e)}
                                className='full block py-2 px-2 ml-1 items-center border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm'
                            >
                                <option>{"all"}</option>
                                {posts.map((item : any, index) => (
                                    <option key={item.key}>
                                        {item.category}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <select
                                name='category'
                                className='full block py-2 px-2 ml-1 items-center border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm'
                            >
                                <option>{`all`}</option>
                            </select>
                        )}
                        <button
                            type='submit'
                            className='h-full flex items-center text-white absolute right-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            {posts && posts.length > 0 ? (
                posts.map((item, index) => (
                    <div
                        key={item.id}
                        className='w-full p-3 flex flex-col justify-between h-auto overflow-auto lg:h-auto'
                    >
                        <div className='flex gap-2'>
                            <h1 className='text-left text-sm md:text-lg font-bold leading-normal'>
                                {item.title}
                            </h1>
                            <span className='bg-emerald-500 p-1 rounded-md text-white'>
                                {item.category}
                            </span>
                        </div>
                        <div className='text-sm gap-4 flex'>
                            {item.content}{" "}
                            <button className='text-sky-600'>
                                <Link href={`posts/detail/${item.id}`}>
                                    Read more
                                </Link>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className='w-full p-3 flex flex-col justify-between h-auto overflow-auto lg:h-auto'>
                    <h1 className='text-left text-sm md:text-lg font-bold leading-normal'>
                        No results found
                    </h1>
                </div>
            )}
        </div>
    );
}

export default HomePage;

// export const getStaticProps = async () => {
//     const feed = await prisma.post.findMany({
//         where: { published: "True" },
//         include: {
//             author: {
//                 select: { name: true },
//             },
//         },
//     });
//     return {
//         props: { feed },
//         revalidate: 10,
//     };
// };
