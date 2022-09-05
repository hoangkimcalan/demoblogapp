import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { postRoute, updatepostRoute } from '../../../utils/APIRoutes';

function Edit() {

    const [post, setPost] = useState({
        id: "",
        title: "",
        content: "",
        category: "",
        published: "",
        authorId: ""
    });

    const router = useRouter();

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        const { id, title, content, category, published } = post;
        const { data } = await axios.put(updatepostRoute, { id, title, content, published, category })
        if (data) {
            alert("Created a post successfully");
            router.push("/posts");
        };
    }
    const handleChange = (e : any) => {
        console.log(e.target.value);
        setPost({ ...post, [e.target.name]: e.target.value });

    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.patch(updatepostRoute, { id: router.query.id });
            console.log("data", data);
            if (data.status == 200) {
                console.log("post", data.data);
                setPost(data.data);
            }
        }
        fetchData();
    }, []);



    return (
        <div className="p-8">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md"><Link href="/posts">Back</Link></button>
            <div className="p-8 flex justify-center w-screen h-screen">
                <form onSubmit={handleSubmit} className="w-[60%]">
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid gap-6">
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name="title" value={post?.title} className="p-1 mt-1 h-12 block w-full shadow-sm sm:text-sm border-2 rounded-md" />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Content</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name="content" value={post?.content} className="p-1 mt-1 h-12 block w-full shadow-sm sm:text-sm border-2 rounded-md" />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input onChange={(e) => handleChange(e)} type="text" name="category" value={post?.category} className="p-1 mt-1 h-12 block w-full shadow-sm sm:text-sm border-2 rounded-md" />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Published</label>
                                    <select onChange={(e) => handleChange(e)} name="published" value={post?.published} className="mt-1 h-12 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm">
                                        <option>True</option>
                                        <option>False</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit
