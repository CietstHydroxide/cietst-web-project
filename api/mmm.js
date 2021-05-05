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
            result: text.replace(/([AIUEOW])(?=[B-DF-HJ-NP-T-VX-Z])/g, '$1M').replace(/([aiueow])(?=[b-df-hj-np-t-vx-z])/g, '$1m').replace(/([A-LN-Z])N/g, '$1MN').replace(/([a-ln-z])n/g, '$1mn')
        }
    });
}

x.api = 'mmm';

module.exports = x

/*
.replace(/([aiueow])/g, '$1m')
.replace(/[a-ln-z]n/g, 'mn')
.replace(/[A-LN-Z]N/g, 'MN')
.replace(/([aiueo])m([\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+ ])/, '$1$2')
.replace(/([AIUEO])M([\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+ ])/, '$1$2')
*/