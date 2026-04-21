import express from 'express';

const app = express();
app.use(express.json());

// "Banco" em memória
let filmes = [];
let idAtual = 1;

//  Criar filme
app.post('/filmes', (req, res) => {
    const { titulo, diretor, ano, nota } = req.body;

    if (!titulo || !diretor || !ano || nota === undefined) {
        return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    const novoFilme = {
        id: idAtual++,
        titulo,
        diretor,
        ano,
        nota
    };

    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

// Listar filmes + filtro por nota
app.get('/filmes', (req, res) => {
    const { nota } = req.query;

    let resultado = filmes;

    if (nota) {
        resultado = filmes.filter(f => f.nota >= Number(nota));
    }

    res.json(resultado);
});

// Buscar por ID
app.get('/filmes/:id', (req, res) => {
    const filme = filmes.find(f => f.id === Number(req.params.id));

    if (!filme) {
        return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.json(filme);
});

// Atualizar
app.put('/filmes/:id', (req, res) => {
    const filme = filmes.find(f => f.id === Number(req.params.id));

    if (!filme) {
        return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    const { titulo, diretor, ano, nota } = req.body;

    filme.titulo = titulo ?? filme.titulo;
    filme.diretor = diretor ?? filme.diretor;
    filme.ano = ano ?? filme.ano;
    filme.nota = nota ?? filme.nota;

    res.json(filme);
});

// Deletar
app.delete('/filmes/:id', (req, res) => {
    const index = filmes.findIndex(f => f.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    filmes.splice(index, 1);
    res.json({ mensagem: 'Filme removido com sucesso' });
});

//  Servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});