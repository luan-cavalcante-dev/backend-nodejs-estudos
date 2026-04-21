export default function validarTransferencia(req, res, next) {
    const { valor, contaOrigem, contaDestino } = req.body;
    let erros = [];

    if (valor === undefined || typeof valor !== 'number' || valor <= 0) {
        erros.push('Valor inválido');
    }

    if (!contaOrigem) erros.push('Conta origem obrigatória');
    if (!contaDestino) erros.push('Conta destino obrigatória');

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    next();
}