module.exports = (req, res) => {
    const text = req.query.q;
    if (!text) return res.status('404').send({
        ok: false,
        message: 'q parameter is required.',
        creator: 'CietstHydroxide'
    });
    return res.status('200').send({
        ok: true,
        data: {
            query: text,
            result: text.toLowerCase().replace(/(?<=(?:[^]+|^)(?:[aiueoy]+))(?![^b-df-hj-lnp-tv-xyz]+|y+(?![aiueo])|$)/gi, 'm')
        },
        creator: 'CietstHydroxide'
    });
}