import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// You can move this to a types file
declare global {
    namespace Express {
        interface Request {
            user?: string
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(403).json({
            message: "Token required",
        });
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
        return
    }
};
