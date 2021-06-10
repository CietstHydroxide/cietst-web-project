const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, 'web')));
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
});

global.APIS = {};

function loadAPI () {
    for (const v of fs.readdirSync('./api/')) {
        if (!/\.js$/.test) continue;
        try {
            const _api = require('./api/'+v);
            global.APIS[v.replace(/\.js$/, '')] = _api;
        } catch (e) {
            console.log(e);
            continue;
        }
    }
}

loadAPI();

fs.watch('./api/', (_, file) => {
    delete global.APIS[file.replace(/\.js$/, '')];
    delete require.cache[require.resolve('./api/'+file)];
    if (!fs.existsSync('./api/' + file)) return;
    loadAPI();
});

app.get('/', (req, res)=> {
    res.status('200').sendFile(path.resolve(__dirname, 'web', 'index.html'));
});

app.get('/api/*', (req, res)=> {
    const api = req.path.replace(/^\/api\//, '').toLowerCase();
    const ready = APIS[api];
    if (!ready) return res.status('404').send({
        ok: false,
        message: 'API not found.',
        creator: 'CietstHydroxide'
    });
    if (typeof ready !== 'function') return res.status('500').send({
        ok: false,
        message: 'Internal server error.',
        creator: 'CietstHydroxide'
    });
    ready(req, res);
});

app.get('/wordpuzzleresolver', (req,res)=> {
    res.status('200').sendFile(path.resolve(__dirname, 'web', 'wordpuzzleresolver.html'));
});