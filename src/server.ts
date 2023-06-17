import express from 'express';
import { sequelize } from './database';
import { router } from './routes';

const app = express()
const cors = require('cors');

app.use(cors());

app.use(express.static('public'))

app.use(express.json())

app.use(router);

app.listen(() => {
  sequelize.authenticate().then(() => {
    console.log('Conectado ao Banco de Dados');
  })
  console.log(`Servidor iniciado`)
})