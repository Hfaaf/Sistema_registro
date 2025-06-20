import express, { Request, Response } from "express"
import { createCustumer, DeleteCustomer, GetAllCustomers } from "../controllers/Custumer"
import { authenticateToken } from "../middleware/middleware"
import Customer from "../models/Customer";

const router = express.Router();

// Controle simples em memória (1 partida por vez)
let gameStarted = false;
let gameEndTime: number | null = null;

// Iniciar o jogo
router.post("/start-game", authenticateToken, (req: Request, res: Response) => {
    gameStarted = true;
    gameEndTime = Date.now() + 60 * 60 * 1000; // 1 hora a partir de agora
    res.json({ ok: true });
});

// Resetar o jogo
router.post("/reset-game", authenticateToken, (req: Request, res: Response) => {
    gameStarted = false;
    gameEndTime = null;
    res.json({ ok: true });
});

router.get("/dashboard", authenticateToken, async (req: Request, res: Response) => {
    const token = req.cookies?.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
    const customers = await Customer.find({ user: req.user?.id });
    res.render("dashboard", {
        title: "Dashboard",
        username: req.user?.username,
        customers
    });
});

router.get("/start", authenticateToken, async (req: Request, res: Response) => {
    const customers = await Customer.find({ user: req.user?.id });
    res.render("startGame", {
        title: "Iniciar Jogo",
        username: req.user?.username,
        customers
    });
});

router.get("/race", authenticateToken, async (req: Request, res: Response) => {
    const customers = await Customer.find({ user: req.user?.id });
    res.render("race", {
        title: "Corrida",
        username: req.user?.username,
        customers
    });
});

// Dados para a tela de corrida
router.get("/race-data", authenticateToken, async (req: Request, res: Response) => {
    const customers = await Customer.find({ user: req.user?.id });
    let timer = null;
    if (gameStarted && gameEndTime) {
        timer = Math.max(0, Math.floor((gameEndTime - Date.now()) / 1000));
    }
    res.json({
        customers: customers.map(c => ({
            name: c.name,
            finalValue: c.finalValue ?? 0
        })),
        timer,
        gameStarted
    });
});

router.post("/update-money/:id", authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        const { value } = req.body;
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (customer) {
            customer.finalValue = (customer.finalValue ?? 0) + Number(value);
            await customer.save();
             res.json({ finalValue: customer.finalValue })
             return
        }
        res.status(404).json({ error: "Cliente não encontrado" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

router.post("/", authenticateToken, createCustumer)
router.post("/delete/:id", authenticateToken, DeleteCustomer)
router.get("/", GetAllCustomers)

export default router