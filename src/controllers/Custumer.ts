import { Request, Response } from "express";
import Customer from "../models/Customer";

export async function createCustumer(req: Request, res: Response){
    try{
        const { name, paymentMethod, initialValue } = req.body;
        const userId = req.user.id;

        const customer = new Customer({
            name,
            paymentMethod,
            initialValue,
            finalValue: initialValue,
            user: userId
        });

        await customer.save();
        res.redirect("/customers/dashboard");
    }catch(e){
        res.status(500).json({ error: "Erro ao cadastrar cliente", e });
    }
}

export async function GetAllCustomers(req: Request, res: Response) {
    try{
        const customers = await Customer.find().populate("user", "username");
        res.json(customers)
    }catch(e){
        res.status(500).json({error: "Erro ao buscar cliente", e})
    }
}

export async function DeleteCustomer(req: Request, res: Response) {
    try{
        const { id } = req.params
        await Customer.findByIdAndDelete(id)
        res.redirect("/customers/dashboard")
    }catch(e){}
}