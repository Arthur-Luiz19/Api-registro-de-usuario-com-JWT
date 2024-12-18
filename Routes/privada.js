import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient
const router = express.Router();

router.get('/listar_usuarios', async (req, res) => {

    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ message: 'Usuários listados com sucesso', users});

    } catch (err) {
        res.status(500).json({ message: 'Falha no servidor', err });
    }
})

export default router;
