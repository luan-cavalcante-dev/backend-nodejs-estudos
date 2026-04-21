import express from 'express';

const app = express();
app.use(express.json());

// BD SIMULADO
let tarefas =[];
let idAtual = 1;

// CRIAR TAREFA
app.post('/tarefas', (req, res) => {
    const { titulo, descricao } = req.body;

    const novaTarefa = {
        id: idAtual++,
        descricao,
        status: 'pendente',
        dataCriacao: new Date()
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// LISTAR TAREFAS
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// ATUALIZAR TAREFA
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, status } = req.body;

    const tarefa = tarefas.find(t => t.id === parseInt(id));

    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }
    if (descricao) { tarefa.descricao = descricao; }
    if (status) { tarefa.status = status; }

    res.json(tarefa);
});

// DETELAR TAREFA
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;

    const index = tarefas.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }

    tarefas.splice(index, 1);
    res.jason({ mensagem: 'Tarefa deletada com sucesso' }); 
});

// CONCLUIR TAREFA
app.patch('/tarefas/:id/concluir', (req, res) => {
    const { id } = req.params;

    const tarefa = tarefas.find(t => t.id === parseInt(id));

    if (!tarefa) {
        return res.status(404).json({ mensagem: 'Tarefa não encontrada' });
    }

    tarefa.status = 'concluida';
    res.json(tarefa);
});

// INICIAR SERVIDOR
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});


