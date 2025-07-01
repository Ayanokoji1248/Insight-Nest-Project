import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import userModel from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUserSchema = z.object({
    fullName: z.string().min(5, "Atleast 5 character"),
    username: z.string().min(5, "Atleast 5 character"),
    email: z.string().email("Not Valid Email"),
    password: z.string().min(8, "Atleast 8 character")
})

const loginUserSchema = registerUserSchema.pick({
    email: true,
    password: true
})


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullName, username, email, password } = req.body;

        const Validated = registerUserSchema.safeParse(req.body)

        if (!Validated.success) {
            res.status(400).json({
                errors: Validated.error.flatten().fieldErrors
            })
            return
        }
        const userExisted = await userModel.findOne({ email })

        if (userExisted) {
            res.status(400).json({
                message: "Username taken"
            })
            return
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        const { password: _, ...userData } = user.toObject()

        const token = jwt.sign({
            id: user._id, username
        }, process.env.JWT_SECRET as string, { expiresIn: '7d' })

        res.cookie("token", token, {
            httpOnly: true
        })

        res.status(201).json({
            message: "User created",
            user: userData,
            token,
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error
        })
    }



}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const validate = loginUserSchema.safeParse(req.body)

        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            })
            return
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(400).json({
                message: "Credentials Invalid"
            })
            return
        }

        const passCompare = await bcrypt.compare(password, user.password)

        if (!passCompare) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET as string, {
            expiresIn: '7d'
        })

        res.cookie("token", token, {
            httpOnly: true
        })

        const { password: _, ...userData } = user.toObject()

        res.status(200).json({
            user: userData,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }



}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("token", {
            httpOnly: true
        })
        res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}