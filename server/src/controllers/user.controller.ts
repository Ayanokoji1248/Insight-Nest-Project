import e, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userModel from "../models/user.model";

export const getMeProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid Id"
            })
            return
        }

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        res.status(200).json({
            message: "Current User Profile",
            user
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

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id"
            })
            return
        }

        const user = await userModel.findById(id).select("-password");

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        res.status(200).json({
            message: "User Found",
            user
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateUserProfilePic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { avatar } = req.body
        const userId = req.user;

        const user = await userModel.findByIdAndUpdate(userId, { avatar }, { new: true })

        res.status(200).json({
            user,
            message: "Profile image uploaded"
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
        })
        return
    }
}