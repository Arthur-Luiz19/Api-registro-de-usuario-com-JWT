import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//Cadastro
router.post('/cadastro', async (req, res) => {

    try {
        const user = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        const DB = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashPassword,
            },
        })
        res.status(201).json(DB);

    } catch (err) {
        res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde" })
    }
})

router.post('/login', async (req, res) => {
    
    try {
        const userInfo = req.body;

        //Busca o usuário no banco de dados
        const user = await prisma.user.findUnique({
            where: { email: userInfo.email },
        })

        if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
        }

        //Compara a senha do banco de dados com o a senha digitada pelo usuário
        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        if(!isMatch){
            return res.status(404).json({message: "Senha inválida"});
        }

        //Gerar o token JWT
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '7d'});


        res.status(200).json(token);

    } catch (err){
        res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde" })
    }

})

export default router;