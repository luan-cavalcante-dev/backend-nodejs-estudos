export default function logger(req, res, next) {
    const oldSend = res.send;

    res.send = function (data) {
        if (res.statusCode >= 400) {
            console.log(`[ERRO] ${req.method} ${req.url} - ${res.statusCode}`);
        }
        return oldSend.apply(res, arguments);
    };

    next();
}