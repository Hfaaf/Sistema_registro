import mongoose from "mongoose";

export async function ConectData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Monopoly')
        console.log("Conectado ao mongoDB")
    } catch(e) {
        console.log(`Erro ao conectar o banco de dados${e}`)
    }
}