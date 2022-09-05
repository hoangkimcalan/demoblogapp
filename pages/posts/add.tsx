import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react';
import { postRoute } from './../../utils/APIRoutes';
import { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { GetUserType } from '../../lib/types/auth';


const AddPost = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        author: "",
        title: "",
        content: "",
        category: "",
        published: "True",
    });
    const [currentUser, setCurrentUser] = useState<GetUserType>();

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem("blog-user")) {
                router.push("/auth/login");
            } else {
                setCurrentUser(await JSON.parse(String(localStorage.getItem("blog-user"))))
            }
        }
        checkUser();
    }, [])

    const handleChange = (e : any) => {
        console.log(typeof e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        if (currentUser?.name != values.author) {
            alert("Incorrect user");
        } else {
            const { title, content, category, published } = values;
            const { data } = await axios.post(postRoute, { title, content, category, published: published, authorId: currentUser.userId });
            console.log(data);
            if (data) {
                alert("Created a post successfully");
                router.push("/posts");
            }
        }
    }

    return (
        <div className="p-8">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md"><Link href="/posts">Back</Link></button>
            <div className="p-8 flex justify-center w-screen h-screen">
                <form onSubmit={handleSubmit} className="w-[60%]">
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid gap-6">
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Author</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name="author" className="p-1 mt-1 h-12 block w-full shadow-sm sm:text-sm border-2 rounded-md" />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name="title" className="p-1 mt-1 h-12 block w-full shadow-sm sm:text-sm border-2 rounded-md" />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Content</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name="content" className="p-1 mt-1 h-12 block w-full shadow-sm sm:text-sm border-2 rounded-md" />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name="category" className="p-1 mt-1 h-12 block w-full shadow-sm sm:text-sm border-2 rounded-md" />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Published</label>
                                    <select onChange={(e) => handleChange(e)} name="published" className="mt-1 h-12 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm">
                                        <option>True</option>
                                        <option>False</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPost