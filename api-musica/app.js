import express from 'express';

const app = express();
app.use(express.json());

// BD SIMULADO
let musicas = [];
let idAtual = 1;

// CRIAR MÚSICA
app.post('/musicas', (req, res) => {
  const { titulo, artista, album, duracao } = req.body;

  if (!titulo || !artista || !album || !duracao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const novaMusica = {
    id: idAtual++,
    titulo,
    artista,
    album,
    duracao: Number(duracao)        
  };
  musicas.push(novaMusica);
  res.status(201).json(novaMusica);
});

// LISTAR MÚSICAS
app.get('/musicas', (req, res) => {
  const {artista} = req.query;

  if (artista) {
    const musicasFiltradas = musicas.filter(musica => musica.artista.toLowerCase() === artista.toLowerCase());
    return res.json(musicasFiltradas);
  }

  res.json(musicas);    
});

// BUSCAR MÚSICA POR ID
app.get('/musicas/:id', (req, res) => {
  const { id } = req.params;
  const musica = musicas.find(m => m.id === Number(id));

  if (!musica) {
    return res.status(404).json({ error: 'Música não encontrada' });
  }

  res.json(musica);
});

// ATUALIZAR MÚSICA
app.put('/musicas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, artista, album, duracao } = req.body;

  const musica = musicas.findIndex(m => m.id === Number(id));
  
  if (!musica) {
    return res.status(404).json({ error: 'Música não encontrada' });
  }

  if (titulo) musica.titulo = titulo;
  if (artista) musica.artista = artista;
  if (album) musica.album = album;
  if (duracao) musica.duracao = Number(duracao);

  res.json(musica);
});

// DELETAR MÚSICA
app.delete('/musicas/:id', (req, res) => {
  const { id } = req.params;
  const index = musicas.findIndex(m => m.id === Number(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Música não encontrada' });
  }

  musicas.splice(index, 1);
  res.status(204).send();
}); 

// INICIAR SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});