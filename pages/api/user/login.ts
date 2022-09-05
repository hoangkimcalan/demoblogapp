import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

import { setCookie } from "cookies-next";
import cookie from "cookie";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method == "POST") {
        try {
            const { name, password } = req.body;
            const checkUser : any = await prisma.user.findFirst({
                where: {
                    name: name,
                },
                include: {
                    posts: true,
                },
            });
            const check = await isHaveUser(name, password);
            console.log("Checkkk", check);
            if (check === false) {
                return res
                    .status(400)
                    .json({ msg: "Name or password incorrect" });
            }
            const accessToken = jwt.sign(
                { userId: checkUser.id, name: checkUser.name },
                "1234",
                {
                    expiresIn: "7d",
                }
            );
            console.log(accessToken);

            setCookie("user", accessToken, {
                req,
                res,
                maxAge: 60 * 60 * 24 * 7,
            });

            res.setHeader("usertoken", accessToken);
            return res.status(200).json({ name: name });
        } catch (error) {
            res.status(400).json({ msg: "Error, try again" });
        }
    } else {
        try {
            if (req.method === "GET") {
                const tokenHeader = req.headers.cookie;
                // console.log("tokenHeader", tokenHeader);
                const cookies = cookie.parse(req.headers.cookie || "");
                // console.log("cookies.user", cookies.user);
                var decoded = jwt.verify(cookies.user, "1234");
                return res.status(200).json({ decoded });
            }
        } catch (error) {
            res.status(400).json({ msg: "Error, try again" });
        }
    }
}

async function isHaveUser(name : string, password : string) {
    let check = false;
    if (!name) return false;
    const checkUser : any = await prisma.user.findFirst({
        where: {
            name: name,
        },
        include: {
            posts: true,
        },
    });
    if (checkUser !== null) check = true;
    if (!password) return check;
    return bcrypt.compare(password, checkUser.password);
}
