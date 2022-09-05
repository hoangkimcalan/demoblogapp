import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { registerRoute } from "../../utils/APIRoutes";

function Register() {
    const router = useRouter();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        if (handleValidation()) {
            const { email, name, password } = values;
            const { data } = await axios.post(registerRoute, { email, name, password });
            console.log(data);
            if (data) {
                alert("Created an account successfully");
                localStorage.setItem("blog-user", JSON.stringify(data));
                router.push("/auth/login");
            }
        }
    };

    const handleValidation = () => {
        const { email, name, password } = values;
        if (password === "" || name === "" || email === "") {
            alert("Please fill the form correctly!");
            return false;
        } else if (name.length < 6) {
            alert("Username should be greater than 6 characters.");
            return false;
        } else if (password.length < 8) {
            alert("Password should be greater than 8 characters");
            return false;
        } else if (email === "") {
            alert("Email is required");
            return false;
        }
        return true;
    };

    const handleChange = async (e : any) => {
        console.log(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='w-screen h-screen gap-4 flex justify-center items-center'>
                <div className='flex flex-col sign w-[450px] h-[480px] rounded-lg px-16 py-6'>
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
                        />
                        <input
                            className='bg-slate-50 p-1 border-sky-300 border-2 rounded-md w-full font-md focus:border-sky-500 focus:outline-none'
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={(e) => handleChange(e)}
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
                            Create User
                        </button>
                    </form>
                    <span className='mt-2 text-xs text-center uppercase font-semibold'>
                        Already have an account ?{" "}
                        <Link
                            className='text-red-500 font-black hover:text-red-600'
                            href='/auth/login'
                        >
                            <a>Login</a>
                        </Link>
                    </span>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default Register;
