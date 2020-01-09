const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const articles = [{title: "Example"}];
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/articles', (req, res, next) => {
    res.send(articles);
});

app.post('/articles', (req, res, next) => {
    const article = {title: req.body.title};
    articles.push(article);
    res.send(article);
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