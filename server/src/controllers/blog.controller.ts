import { Request, Response, NextFunction } from "express"
import { z } from "zod";
import blogModel from "../models/blog.model";
import mongoose from "mongoose";
import userModel from "../models/user.model";

const blogSchema = z.object({
    title: z.string().min(5, "Atleast 5 Character"),
    content: z.string().min(5, "Atleast 5 Characters"),
    image: z.string().optional(),
    tags: z.array(z.string()).optional()
})


export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, image, tags } = req.body
        const userId = req.user;
        const validate = blogSchema.safeParse(req.body);

        if (!validate.success) {
            res.status(400).json({
                message: "Validation Error",
                error: validate.error.flatten().fieldErrors
            })
            return
        }

        if (!userId) {
            res.status(404).json({
                message: "Unauthorized"
            })
            return
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(404).json({
                message: "Invalid User"
            })
            return
        }

        const userExist = await userModel.findById(userId);
        if (!userExist) {
            res.status(404).json({
                message: "Invalid User"
            })
            return
        }

        const blog = await blogModel.create({
            title,
            content,
            image,
            tags,
            user: userId
        })

        userExist.Blog.push(blog._id);
        await userExist.save();

        res.status(201).json({
            message: "Blog Created",
            blog
        })
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export const editBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user;
        const { id } = req.params
        const { title, content, image, tags } = req.body

        const validate = blogSchema.safeParse(req.body);

        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            })
            return
        }

        if (!userId) {
            res.status(400).json({
                message: "Unauthorized"
            })
            return
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Mongoose Validation Error"
            })
            return
        }

        const user = await userModel.findById(userId);

        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        const blogExist = await blogModel.findById(id)

        if (!blogExist) {
            res.status(400).json({
                message: "Blog doesnt exist"
            })
            return
        }

        if (blogExist?.user.toString() !== userId.toString()) {
            res.status(400).json({
                message: "Invalid Blog"
            })
            return
        }

        const blogEdit = await blogModel.findByIdAndUpdate(id, {
            title,
            content,
            image,
            tags
        }, { new: true });

        res.status(200).json({
            message: "Blog Edited",
            blog: blogEdit
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


