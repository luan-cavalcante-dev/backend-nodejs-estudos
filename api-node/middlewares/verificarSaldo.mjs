export default function verificarSaldo(req, res, next) {
    const { valor } = req.body;

    if (valor > 1000) {
        return res
            .status(422)
            .json({ erros: ['Limite diario excedido'] });
    }

    next();
}