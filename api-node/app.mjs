import express from 'express';

// IMPORTANDO MIDDLEWARES
import validarProduto from './middlewares/validarProduto.mjs';
import autenticar from './middlewares/autenticar.mjs';
import validarEvento from './middlewares/validarEvento.mjs';
import logger from './middlewares/logger.mjs';
import validarTransferencia from './middlewares/validarTransferencia.mjs';
import verificarSaldo from './middlewares/verificarSaldo.mjs';

const app = express();

// MIDDLEWARE GLOBAL
app.use(express.json());

// =====================
// ROTAS
// =====================

// PRODUTOS
app.post('/produtos', validarProduto, (req, res) => {
    res.status(201).json(req.body);
});

// USUÁRIOS (com autenticação)
app.post('/usuarios', autenticar, (req, res) => {
    res.json({ msg: 'Criado' });
});

app.put('/usuarios/:id', autenticar, (req, res) => {
    res.json({ msg: 'Atualizado' });
});

app.delete('/usuarios/:id', autenticar, (req, res) => {
    res.json({ msg: 'Deletado' });
});

// EVENTOS
app.post('/eventos', validarEvento, (req, res) => {
    res.status(201).json(req.body);
});

// TRANSFERÊNCIAS
app.post(
    '/transferencias',
    validarTransferencia,
    verificarSaldo,
    logger,
    (req, res) => {
        res.status(201).json(req.body);
    }
);

// SUBIR SERVIDOR
app.listen(3000, () => {
    console.log('Servidor rodando ');
});