export default function autenticar(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== 'senha123') {
        return res
            .status(401)
            .json({ erros: ['Acesso nao autorizado'] });
    }

    next();
}