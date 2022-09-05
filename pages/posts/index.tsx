import axios from "axios";
import { GetStaticProps } from "next";
import truncate from "truncate-html";
import Link from "next/link";
import React from "react";
import { postRoute, updatepostRoute } from '../../utils/APIRoutes';
import { useEffect, useState } from "react"
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import ReactPaginate from "react-paginate";
import { PostType } from "../../lib/types/post";
const ListUser = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [pagecount, setPageCount] = useState(3);
    const router = useRouter();

    const handleChangePage = async (page : any) => {
        console.log("page.selected", page.selected + 1);
        const resPage = await axios.get(`${postRoute}/${page.selected ? page.selected + 1 : 1}`);
        console.log("resPage", resPage.data.jsonResult.data);
        if (resPage.status == 200) {
            setPosts(resPage.data.jsonResult.data);
            setPageCount(resPage.data.sum)
            localStorage.setItem("postItems", JSON.stringify(resPage.data.data));
        }
    }

    useEffect(() => {
        handleChangePage(1);
    }, [])

    const handleEdit = (e : any) => {
        console.log("editttttt hehe", e)
        router.push(`/posts/edit/${e}`);
    }

    const handleView = (e : any) => {
        router.push(`/posts/detail/${e}`);
    }

    const handleDelete = async (e : any) => {
        console.log("edit cai nayyy", e);
        if (confirm("hehehe")) {
            const { data } = await axios.delete(`${postRoute}/${e}`);
            console.log("data da xoa", data);
            console.log(data);
            if (data) {
                alert("deleted successfully");
                setPosts(posts.filter(item => item.id != data.id))
            }

            console.log("da chon yess");
        } else {
            console.log("da chon noooo")
        }

    }

    return (
        <div className="">
            <Header />
            <div className='p-8 w-full'>
                <button className='p-3 rounded-xl bg-gray-500 text-white font bold'>
                    <Link href={`/posts/add`}>Add</Link>
                </button>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next>"
                    onPageChange={handleChangePage}
                    pageRangeDisplayed={3}
                    pageCount={pagecount / 3}
                    previousLabel="<back"
                    className="inline-flex float-right cursor-pointer gap-2 bg-gray-100 child:rounded-sm  paginate child:bg-gray-500 child:p-1"
                />
                <div className=' flex items-center justify-center font-sans '>
                    <div className='w-full'>
                        <div className='bg-white shadow-md rounded my-6'>
                            <table className='min-w-max w-full table-auto'>
                                <thead>
                                    <tr className='bg-gray-800 text-gray-100 uppercase text-sm leading-normal'>
                                        <th className='py-3 px-6 text-left w-8'>STT</th>
                                        <th className='py-3 px-6 text-left'>
                                            Title
                                        </th>
                                        <th className='py-3 px-6 text-center w-96'>
                                            Content
                                        </th>
                                        <th className='py-3 px-6 text-center w-96'>
                                            Category
                                        </th>
                                        <th className='py-3 px-6 text-center'>
                                            Status
                                        </th>
                                        <th className='py-3 px-6 text-center'>
                                            Actor
                                        </th>
                                        <th className='py-3 px-6 text-center'>
                                            Like
                                        </th>
                                        <th className='py-3 px-6 text-center'>
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-gray-600 text-sm font-light'>
                                    {posts?.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className='border-b border-gray-200 hover:bg-gray-100'
                                        >
                                            <td className='py-3 px-6 text-left whitespace-nowrap w-8'>
                                                <div className='flex items-center'>
                                                    <span className='font-medium'>
                                                        {index + 1}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='py-3 px-6 text-left w-8'>
                                                <div className='flex items-center line-clamp-2'>
                                                    <span>{item.title} </span>
                                                </div>
                                            </td>
                                            <td className='py-3 px-6 text-center w-96'>
                                                <p className="line-clamp-2">{item.content}</p>
                                            </td>
                                            <td className='py-3 px-6 text-center'>
                                                <p className="line-clamp-2 font-bold text-base">{item.category}</p>
                                            </td>
                                            {item.published == "True" ? <td className='py-3 px-6 text-center'>
                                                <span className='bg-emerald-200 text-emerald-600 py-1 px-3 rounded-full text-xs'>
                                                    Public
                                                </span>
                                            </td> : <td className='py-3 px-6 text-center'>
                                                <span className='bg-red-600 text-red-300 py-1 px-3 rounded-full text-xs'>
                                                    Private
                                                </span>
                                            </td>}
                                            <td className='py-3 px-6 text-center'>
                                                <div className='flex item-center justify-center'>
                                                    {/* View */}
                                                    <div onClick={() => handleView(item.id)} className='w-4 mr-2 transform hover:text-emerald-600 hover:scale-110'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                                            />
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                                            />
                                                        </svg>
                                                    </div>
                                                    {/* Edit */}
                                                    <div onClick={() => handleEdit(item.id)} className='w-4 mr-2 transform hover:text-emerald-600 hover:scale-110'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                                                            />
                                                        </svg>
                                                    </div>
                                                    {/* Delete */}
                                                    <div onClick={() => handleDelete(item.id)} className='w-4 mr-2 transform hover:text-emerald-600 hover:scale-110'>
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-3 px-6 text-center'>
                                                {item.likes}
                                            </td>
                                            <td className='py-3 px-6 text-center'>
                                                {item.views}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ListUser;

