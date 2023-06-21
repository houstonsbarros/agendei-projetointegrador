import express from 'express';
import { sequelize } from './database';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

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
