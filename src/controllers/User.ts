import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const SECRET = process.env.JWT_SECRET as string;

export async function Register(req: Request, res: Response): Promise<void> {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/customers/dashboard");
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erro ao cadastrar usuário", details: e });
    }
}

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            res.status(400).render("login", { title: "Login", error: "Usuário não encontrado" });
            return;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(400).render("login", { title: "Login", error: "Senha inválida" });
            return;
        }

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/customers/dashboard");
    } catch (e) {
        res.status(500).render("login", { title: "Login", error: "Erro ao fazer login" });
    }
};
