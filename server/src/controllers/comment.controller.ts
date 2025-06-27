import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import blogModel from "../models/blog.model";
import commentModel from "../models/comment.model";
import { z } from "zod";


const commentSchema = z.object({
    comment: z.string().min(1, "Comment cannot be empty")
})

export const getallComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({
                message: "Invalid Id or Not found"
            })
            return
        }

        const comments = await commentModel.find({
            blog: id
        }).populate("user", "username fullName avatar");

        if (!comments || comments.length === 0) {
            res.status(400).json({
                message: "No Comments"
            })
            return
        }

        res.status(200).json({
            message: "All Comments",
            comments
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params
        const userId = req.user
        const { comment } = req.body

        const validate = commentSchema.safeParse(comment);

        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            })
            return
        }


        if (!id) {
            res.status(400).json({
                message: "Invalid Id"
            })
            return
        }

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid Id"
            })
            return
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            res.status(404).json({
                message: "Blog not found"
            })
            return
        }

        const commentData = await commentModel.create({
            comment,
            user: userId,
            blog: id

        })

        blog.comments.push(commentData._id)
        await blog.save();

        res.status(201).json({
            message: "comment created",
            comment: commentData
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Interal Server Error"
        })
    }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        // Validate comment content
        const validate = commentSchema.safeParse({ comment });
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return
        }

        // Validate ObjectId
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).json({
                message: "Invalid Comment ID"
            });
            return
        }

        const updatedComment = await commentModel.findByIdAndUpdate(
            id,
            { comment },
            { new: true }
        );

        if (!updatedComment) {
            res.status(404).json({
                message: "Comment not found"
            });
            return
        }

        res.status(200).json({
            message: "Comment edited",
            comment: updatedComment
        });
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id or not present"
            })
            return
        }

        const comment = await commentModel.findById(id);

        if (!comment) {
            res.status(404).json({
                message: "Comment Not Found"
            })
            return
        }


        const blogId = comment.blog

        await commentModel.findByIdAndDelete(id)


        await blogModel.findByIdAndUpdate(blogId, {
            $pull: { comments: new mongoose.Types.ObjectId(id) }
        });


        res.status(200).json({
            message: "Comment Deleted"
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}