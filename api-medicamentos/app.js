import express from 'express';

const app = express();
app.use(express.json());

// BD SIMULADA
let medicamentos = [];
let idAtual = 1;

//FUNÇÃO PARA AUXILIAR A ORDENAR HORÁRIOS
function ordenarHorarios(horarios) {
  return horarios.sort((a, b) => a.localeCompare(b));
}

// CRIAR UM NOVO MEDICAMENTO
app.post('/medicamentos', (req, res) => {
  const { nome, dosagem, frequencia, horarios } = req.body;

  if (!nome || !dosagem || !frequencia || !horarios) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  
  const novoMedicamento = { 
    id: idAtual++, 
    nome, 
    dosagem, 
    frequencia, 
    horarios: ordenarHorarios(horarios)  // exemplo: ['08:00', '12:00', '20:00']
    };
    medicamentos.push(novoMedicamento);
    res.status(201).json(novoMedicamento);
}); 

// LISTAR TODOS OS MEDICAMENTOS
app.get('/medicamentos', (req, res) => {
  res.json(medicamentos);
});

//BUSCAR UM MEDICAMENTO POR ID
app.get('/medicamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const medicamento = medicamentos.find(m => m.id === id);
  
  if (!medicamento) {
    return res.status(404).json({ error: 'Medicamento não encontrado.' });
  }
  
  res.json(medicamento);
});

// ATUALIZAR UM MEDICAMENTO
app.put('/medicamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, dosagem, frequencia, horarios } = req.body;
  
  const medicamentoIndex = medicamentos.findIndex(m => m.id === id);

  if (!medicamentoIndex) {
    return res.status(404).json({ error: 'Medicamento não encontrado.' });
  }
   if (nome) medicamentoIndex.nome = nome;
   if (dosagem) medicamentoIndex.dosagem = dosagem;
   if (frequencia) medicamentoIndex.frequencia = frequencia;
   if (horarios) medicamentoIndex.horarios = ordenarHorarios(horarios);
  
  res.json(medicamentoIndex);
});

// DELETAR UM MEDICAMENTO
app.delete('/medicamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const medicamentoIndex = medicamentos.findIndex(m => m.id === id);

  if (medicamentoIndex === -1) {
    return res.status(404).json({ error: 'Medicamento não encontrado.' });
  }

  medicamentos.splice(medicamentoIndex, 1);
  res.json({ message: 'Medicamento deletado com sucesso.' });

});

// INICIAR O SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



  