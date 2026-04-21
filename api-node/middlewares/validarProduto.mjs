export default function validarProduto(req, res, next) {
    const { nome, preco, estoque } = req.body;
    let erros = [];

    if (!nome || typeof nome !== 'string' || nome.length < 3) {
        erros.push('Nome inválido');
    }

    if (preco === undefined || typeof preco !== 'number' || preco <= 0) {
        erros.push('Preço inválido');
    }

    if (
        estoque === undefined ||
        !Number.isInteger(estoque) ||
        estoque < 0
    ) {
        erros.push('Estoque inválido');
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    next();
}