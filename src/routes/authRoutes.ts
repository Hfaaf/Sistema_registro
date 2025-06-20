import express, { Request, Response } from "express";
import { Login, Register } from "../controllers/User";

const router = express.Router();

router.get("/register", (req: Request, res: Response) => res.render("register", {title: "Cadastro" }))
router.get("/login", (req: Request, res: Response) => res.render("login", {title: "Login" }))

router.post("/register", Register);
router.post("/login", Login);

export default router;
