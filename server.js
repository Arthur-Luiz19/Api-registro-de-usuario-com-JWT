import express from 'express';
import publicRoutes from './Routes/Publicas.js';
import privateRoutes from './Routes/privada.js';
import auth from './Middleware/auth.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);


app.listen(3000, () => console.log('Servidor rodando com sucesso!'));