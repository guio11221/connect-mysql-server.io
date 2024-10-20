const express = require('express');
const session = require('express-session');
const MySQLStore = require('..')(session);

const app = express();

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1gf9cb8do',
    database: 'db_priv'
};

const sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
        httpOnly: true,
        secure: false, // Defina como true se você estiver usando HTTPS
        sameSite: 'strict' // Pode ser 'lax', 'strict' ou 'none'
    }
}));

app.get('/login', (req, res) => {
    req.session.userId = 'user123'; // Armazena dados na sessão
    req.session.data = {
        key: 'value',
        anotherKey: 'anotherValue'
    };
    console.log('Sessão criada:', req.session); // Log da sessão
    res.send('Sessão criada!');
});

app.get('/session-data', (req, res) => {
    if (req.session.userId) {
        console.log('Sessão encontrada:', req.session);
        res.send(`Dados da sessão: ${JSON.stringify(req.session.data)}`);
    } else {
        console.log('Sessão não encontrada ou expirou.');
        res.send('Sessão não encontrada ou expirou.');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
