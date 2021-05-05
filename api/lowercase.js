const x = {};

x.start = (req, res) => {
    const text = req.query.q;
    if (!text) return res.status('404').send({
        status: res.statusCode,
        message: 'q parameter is required.'
    });
    return res.status('200').send({
        status: res.statusCode,
        creator: 'CietstHydroxide',
        data: {
            query: text,
            result: text.toLowerCase()
        }
    });
}

x.api = 'lowercase';

module.exports = x;