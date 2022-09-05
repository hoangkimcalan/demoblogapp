import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import type { NextApiRequest, NextApiResponse } from "next";


export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    console.log("req method", req.method);
    if (req.method === "PUT") {
        try {
            const { id, title, content, category, published } = req.body;
            console.log(req.body);
            const post = await prisma.post.update({
                where: {
                    id: id,
                },
                data: {
                    id,
                    title,
                    content,
                    category,
                    published,
                },
            });
            res.status(200).json(post);
            console.log(post);
        } catch (error) {}
    } else {
        if (req.method === "PATCH") {
            try {
                console.log(req.method);
                const { id } = req.body;
                const post : any = await prisma.post.findUnique({
                    where: { id: id },
                    include: { author: true },
                });
                console.log(post.id);
                res.status(200).json(post);
            } catch (error) {
                res.status(400).json({
                    message: "Cound not found a post for you",
                });
            }
        } else {
            if (req.method === "DELETE") {
                try {
                    console.log("req.method", req.method);
                    console.log("id", req.query.id);
                    const post = await prisma.post.delete({
                        where: { id: String(req.query.id) },
                    });
                    // console.log("post deleted", post);
                    res.status(200).json(post);
                } catch (error) {
                    res.status(400).json({
                        message: "Cound not found a post for you",
                    });
                }
            } else {
                try {
                    console.log("req.method", req.method);
                    console.log("id", req.query.id);
                    const tokenHeader = req.headers.cookie;
                    const cookies = cookie.parse(tokenHeader || "");
                    // console.log(".....", cookies.user);
                    var decoded : any = jwt.verify(cookies.user, "1234");
                    // console.log("decode", decoded.userId);

                    const posts = await prisma.post.findMany({
                        where: {
                            authorId: decoded.userId,
                        },
                        include: { author: true },
                    });

                    let current_page = 1;
                    let page : number = Number(req.query.id);
                    if (page) {
                        current_page = page;
                    }
                    let limit = 3;
                    let totalPosts = posts.length;
                    let total_page = Math.ceil(totalPosts / limit);
                    if (current_page > total_page) {
                        current_page = total_page;
                    } else if (current_page < 1) {
                        current_page = 1;
                    }

                    let pagination = {
                        current_page: current_page,
                        per_page: limit,
                        total_page: total_page,
                        total: totalPosts,
                    };
                    var currentItems = posts.slice(
                        page * limit - limit,
                        page * limit
                    );
                    let jsonResult = {
                        pagination: pagination,
                        data: currentItems,
                    };
                    // console.log(jsonResult);
                    const sum = posts.length;
                    res.status(200).json({ jsonResult, sum });
                } catch (error) {
                    res.status(400).json({
                        message: "Không lấy được danh sách",
                    });
                }
            }
        }
    }
}
