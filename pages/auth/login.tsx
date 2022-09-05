import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from 'axios';

import { loginRoute } from "../../utils/APIRoutes";

function Login() {
    const router = useRouter();
    const [values, setValues] = useState({ name: "", password: "" });


    const handleSubmit = async (event : any) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, name } = values;
            const { data } = await axios.post(loginRoute, { password, name });
            if (data) {
                alert("Login successfully")
                localStorage.setItem("blog-user", JSON.stringify(data));
                router.push("/");
            }
        }
    };

    const handleValidation = () => {
        const { name, password } = values;
        if (password === "" || name === "") {
            alert("Username and password is required");
            return false;
        }
        return true;
    };

    const handleChange = (e : any) => {
        console.log(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='w-screen h-screen gap-4 flex justify-center items-center'>
                <div className='flex flex-col sign w-[450px] h-[380px] rounded-lg px-16 py-6'>
                    <div className='flex gap-4 items-center justify-center '>
                        <h1 className='font-bold text-lg uppercase text-slate-800'>
                            NeverGone
                        </h1>
                    </div>

                    <form
                        onSubmit={(event) => handleSubmit(event)}
                        className=' flex flex-col gap-8 justify-center mt-4'
                    >
                        <input
                            className='bg-slate-50 p-1 border-sky-300 border-2 rounded-md w-full font-md focus:border-sky-500 focus:outline-none'
                            type='text'
                            placeholder='Username'
                            name='name'
                            onChange={(e) => handleChange(e)}
                            min='6'
                        />
                        <input
                            className='bg-slate-50 p-1 border-sky-300 border-2 rounded-md w-full font-md focus:border-sky-500 focus:outline-none'
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={(e) => handleChange(e)}
                        />
                        <button
                            className=' z-10 create-button uppercase font-black text-sm p-2 rounded-md hover:text-slate-200 transition'
                            type='submit'
                        >
                            Login
                        </button>
                    </form>
                    <span className='mt-2 text-xs text-center uppercase font-semibold'>
                        Didn't have an account ?{" "}
                        <Link
                            className='text-red-500 font-black hover:text-red-600'
                            href='/auth/register'
                        >
                            Register
                        </Link>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Login;
