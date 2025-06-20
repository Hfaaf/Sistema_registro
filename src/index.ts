import express, { Request, Response } from "express";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser"

import { ConectData } from "./config/db";
import "dotenv/config";

import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";

const app = express();
app.use(express.json());

ConectData();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layout");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.render("login", { title: "Login" });
});

app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});