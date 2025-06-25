import { Request, Response, NextFunction } from "express";

export const registerUser = (req: Request, res: Response, next: NextFunction) => {
    const { fullName, username, email, password } = req.body
}