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

global.APIS = Object.fromEntries(fs.readdirSync('./api/').filter(file => /\.js$/.test(file)).map(file => [file, {}]));
for (let file in APIS) {
    try { APIS[file] = require('./api/' + file); }
    catch (e) { console.error(e); delete APIS[file]; }
}
fs.watch('./api/', (_, file) => {
    delete APIS[file];
    if (fs.existsSync('./api/' + file)) {
        try {
            delete require.cache[require.resolve('./api/' + file)];
            APIS[file] = require('./api/' + file);
        } catch (e) {
            console.error(e);
        }
    }
});

app.get('/', (req,res) => {
    res.status('404').render(path.resolve(__dirname, 'web', 'index.html'));
});

app.get('/api/*', (req,res) => {
    const api = req._parsedOriginalUrl.pathname.replace(/\/api\/([a-z0-9]+)(\/.*)?/g, '$1');
    const ready = Object.entries(APIS).filter(v => v[1].api === api)[0];
    if (!ready) return res.status('404').send({
        status: res.statusCode,
        message: 'not found.'
    });
    ready[1].start(req, res);
});