import express from 'express';
import { sequelize } from './database';
import { router } from './routes';

const app = express()

app.use(express.static('public'))

app.use(express.json())

app.use(router);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('Conectado ao Banco de Dados');
  })
  console.log(`Servidor iniciado`)
})