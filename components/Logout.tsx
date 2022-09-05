import React from 'react'
import { useRouter } from "next/router";
import { deleteCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from "next";


function Logout() {

    const router = useRouter();

    const handleLogout : any = (req :  NextApiRequest, res : NextApiResponse) => {
        localStorage.clear();
        deleteCookie("user", {
            req,
            res,
        });
        alert("Logout completed")
        router.push("/");
    }

    return (
        <div className="cursor-pointer" onClick={handleLogout}>Logout</div>
    )
}

export default Logout;