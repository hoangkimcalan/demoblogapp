import prisma from "../../../../lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    console.log("req method", req.method);
    if (req.method === "GET") {
        try {
            console.log("req.query.id", req.query.id);
            const idpost = req.query.id;
            const checkPost = await prisma.post.findFirst({
                where: {
                    id: String(idpost),
                },
                include: { author: true },
            });
            console.log("checkUser", checkPost);
            const commentSent = await prisma.comment.findMany({
                where: { postId: String(req.query.id) },
                include: {
                    commentator: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            if (checkPost) {
                res.status(200).json({ checkPost, commentSent });
            } else {
                res.status(400).json({ msg: "Error, try again" });
            }
        } catch (error) {}
    }  
    if (req.method == "PUT") {
            try {
                console.log(req.method);
                const tokenHeader = req.headers.cookie;
                const idpost = req.query.id;
                const cookies = cookie.parse(tokenHeader || "");
                // console.log(".....", cookies.user);
                var decoded : any = jwt.verify(cookies.user, "1234");
                console.log("decoded", decoded.userId);
                const userIdLiked = decoded.userId;
                const { likes } = req.body.data;
                console.log("like", typeof userIdLiked);

                const isLikedPost = await prisma.post.findFirst({
                    where: {
                        idLiked: {
                            has: userIdLiked,
                        },
                    },
                });
                console.log("isLikedPost", isLikedPost);
                if (!isLikedPost) {
                    const checkPost = await prisma.post.update({
                        where: {
                            id: String(idpost),
                        },
                        data: {
                            idLiked: {
                                push: userIdLiked,
                            },
                            likes: likes + 1,
                        },
                        include: { author: true },
                    });
                    console.log("checkPost", checkPost);
                    res.status(200).json(checkPost);
                } else {
                    try {
                        const { idLiked } : any = await prisma.post.findUnique({
                            where: { id: String(idpost) },
                            select: { idLiked: true },
                        });

                        const checkPost = await prisma.post.update({
                            where: {
                                id: String(idpost),
                            },
                            data: {
                                idLiked: {
                                    set: idLiked.filter(
                                        (id : any) => id !== userIdLiked
                                    ),
                                },
                                likes: likes - 1,
                            },
                            include: { author: true },
                        });
                        console.log("checkPost222", checkPost);
                        res.status(200).json(checkPost);
                    } catch (err) {
                        console.log("err", err);
                    }
                }
            } catch (error) {
                res.status(400).json({ msg: "Error, try again" });
            }
        } 
        if (req.method == "PATCH"){
            try {
                console.log("Patchhhh", req.method);
                const idpost = req.query.id;
                const { views } = req.body.data;
                // console.log("req.body", views);
                const checkPost = await prisma.post.update({
                    where: {
                        id: String(idpost),
                    },

                    data: {
                        views: views + 1,
                    },
                    include: { author: true },
                });
                // console.log("checkPost", checkPost);
                res.status(200).json(checkPost);
            } catch (error) {
                res.status(400).json({ msg: "Error, try again" });
            }
    }
    if (req.method == "POST") {
        try {
            console.log("req.query.id", req.body);
            console.log("cookies", req.headers.cookie);
            const tokenHeader = req.headers.cookie;
            const cookies = cookie.parse(tokenHeader || "");
            // console.log(".....", cookies.user);
            var decoded : any = jwt.verify(cookies.user, "1234");
            console.log("DECODED", decoded);

            const commentSend = await prisma.comment.create({
                data: {
                    content: req.body.comment,
                    postId: String(req.query.id),
                    authorId: decoded.userId,
                    authorComment: decoded.name,
                },
            });
            console.log("commentSend", commentSend);

            const commentSent = await prisma.comment.findMany({
                where: { postId: String(req.query.id) },
                include: {
                    commentator: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            console.log("commentSend", commentSent);
            console.log("req.method", req.method);
            res.status(200).json(commentSent);
        } catch (error) {
            res.status(400).json({ msg: "Error, try again" });
        }
    }
}
