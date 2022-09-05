import Link from "next/link";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import Logout from './Logout';
import { GetUserType } from "../lib/types/auth";

const Header = () => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<GetUserType>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(loginRoute);
            console.log("data", data);
            if (data.status == 200) {
                localStorage.setItem(
                    "blog-user",
                    JSON.stringify({ ...data.data.decoded, password: "" })
                );
            }
        };
        fetchData();
    }, [router]);

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem("blog-user")) {
                router.push("/");
            } else {
                setCurrentUser(await JSON.parse(String(localStorage.getItem("blog-user"))));
            }
        }
        checkUser();
    }, []);


    console.log("current", currentUser);
    return (
        <div className='bg-gray-600 flex justify-between p-4'>
            <ul className='flex  text-white gap-8 '>
                <li className='font-semibold '>
                    <Link href={`/`}>Home</Link>
                </li>
                <li className='font-semibold '>
                    <Link href={`/posts`}>Post</Link>
                </li>
                <li className='font-semibold '>
                    <Link href={`/about`}>About</Link>
                </li>
            </ul>

            {!currentUser ?
                <ul className='flex  text-white gap-8'>
                    <li className='font-semibold '>
                        <Link href={`/auth/login`}>Login</Link>
                    </li>
                    <li className='font-semibold '>
                        <Link href={`/auth/register`}>Register</Link>
                    </li>
                </ul>
                :
                <ul className='flex  text-white gap-8'>
                    <li className='font-semibold '>
                        <h3 className="text-xl text-red-400">{currentUser.name}</h3>
                    </li>
                    <li className='font-semibold '>
                        <Logout />
                    </li>
                </ul>
            }

        </div>
    );
};

export default Header;
