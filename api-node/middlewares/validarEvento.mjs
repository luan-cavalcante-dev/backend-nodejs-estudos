export default function validarEvento(req, res, next) {
    const { nome, data, online, endereco } = req.body;
    let erros = [];

    if (!nome) erros.push('Nome obrigatório');
    if (!data) erros.push('Data obrigatória');

    if (typeof online !== 'boolean') {
        erros.push('Online deve ser booleano');
    }

    if (online === false && !endereco) {
        erros.push('Endereço obrigatório');
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    next();
}