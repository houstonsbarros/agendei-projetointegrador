import express from 'express';
import { sequelize } from './database';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const cors = require('cors');

app.use(cors());

app.use(express.static('public'))

app.use(express.json())

app.use(router);

const port = process.env.PORT

app.listen(port, () => {
  sequelize.authenticate().then(() => {
    console.log('Conectado ao Banco de Dados');
  })
  console.log(`Servidor iniciado na porta ${port}`)
})