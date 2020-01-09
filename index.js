const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const articles = [{title: "Example"}];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/articles', (req, res, next) => {
    res.send(articles);
});

app.post('/articles', (req, res, next) => {
    res.send('OK');
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    delete articles[id];
    res.send({message: "deleted"});
});

app.listen(port, () => console.log(`Express web app available at localhost:${port}`));