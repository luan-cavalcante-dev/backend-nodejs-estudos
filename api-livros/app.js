import express from 'express';

const app = express();
app.use(express.json());

let livros = [];
let id = 1;



// Rota para criar um novo livro
app.get('/livros', (req, res) => {
    const {titulo, autor, genero, lido} = req.body;

    const novoLivro = {
        id: id++,
        titulo,
        autor,
        genero,
        lido
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

// Rota para listar todos os livros
app.get('/livros', (req, res) => {
    res.json(livros);
});

// Rota especial (vem antes da rota com: id)
app.get('/livros/nao-lidos', (req, res) => {
  const livrosNaoLidos = livros.filter(livro => !livro.lido== false);
  res.json(livrosNaoLidos);
});

// Buscar um livro por ID
app.get('/livros/:id', (req, res) => {
    const id = Number(req.params.id);
    const livro = livros.find(livro => livro.id === id);
    

    if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.json(livro);
});

// Rota para atualizar um livro
app.put('/livros/:id', (req, res) => {
    const id = Number(req.params.id);
    const livro = livros.find(livro => livro.id === id);

    if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }

    const {titulo, autor, genero, lido} = req.body;

    livros.titulo = titulo
    livros.autor = autor
    livros.genero = genero
    livros.lido = lido 

    res.json(livro);
});

// Rota para deletar um livro
app.delete('/livros/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = livros.findIndex(livro => livro.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Livro não encontrado' });
    }

    livros.splice(index, 1);
    res.status(204).send();
});
 // Iniciar o servidor
 app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});