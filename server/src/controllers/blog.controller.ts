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

export const getUserBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid Id or Not Present"
            })
            return
        }

        const blogs = await blogModel.find({ user: userId }).populate("user", "fullName username avatar").sort({ createdAt: -1 });

        if (!blogs || blogs.length === 0) {
            res.status(400).json({
                message: "No Blogs"
            })
            return
        }

        res.status(200).json({
            blogs
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await blogModel.find({}).populate("user", "username");
        blogs.reverse()
        res.status(200).json({
            blogs
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id or not present"
            })
            return
        }
        const blog = await blogModel.findById(id).populate("user", "fullName username avatar");

        if (!blog) {
            res.status(404).json({
                message: "Blog not found"
            })
            return
        }

        res.status(200).json({
            blog
        })
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, image, tags, category } = req.body
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
            category,
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
        const { title, content, image, tags, category } = req.body

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
            tags,
            category
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


export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;
        const userId = req.user;

        if (!mongoose.Types.ObjectId.isValid(id) || !id) {
            res.status(400).json({
                message: "Wrong Id or not present"
            })
            return
        }

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid userId or not present"
            })
            return
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            res.status(400).json({
                message: "Blog Not Found"
            })
            return
        }

        const user = await userModel.findById(userId);

        if (!user) {
            res.status(404).json({
                message: "User not exist"
            })
            return
        }

        const blogIndex = user?.Blog.indexOf(new mongoose.Types.ObjectId(id))
        user?.Blog.splice(blogIndex as number, 1)
        await user.save();

        await blog.deleteOne();

        res.status(200).json({
            message: "Blog Deleted"
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid ID"
            })
            return
        }

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User Id"
            })
            return
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            res.status(400).json({
                message: "Blog not found"
            })
            return
        }

        const userObjectId = new mongoose.Types.ObjectId(userId)

        if (blog.likes.includes(userObjectId)) {
            res.status(400).json({
                message: "You Already Like the Blog"
            })
            return
        }

        blog.likes.push(userObjectId)
        await blog.save()

        res.status(200).json({
            message: "Liked Blog"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user;
        const { id } = req.params;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: "Invalid UserId" });
            return
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid BlogId" });
            return
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            res.status(404).json({ message: "Blog not found" });
            return
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const index = blog.likes.findIndex((likeId) => likeId.equals(userObjectId));

        if (index === -1) {
            res.status(400).json({ message: "Post hasn't been liked yet" });
            return
        }

        blog.likes.splice(index, 1);
        await blog.save();

        res.status(200).json({ message: "Post unliked" });
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
};
