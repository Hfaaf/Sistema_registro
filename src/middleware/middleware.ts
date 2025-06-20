import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies?.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
    if (!token) {
        res.status(401).json({ error: "Token não fornecido" });
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token inválido" });
        return;
    }
}