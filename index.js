const express = require('express');
const bodyParser = require('body-parser');
const read = require('node-readability');

const port = process.env.PORT || 3000;
const Article = require('./db').Article;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.send(articles);
    })
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, result) => {
        if (err || !result) res.status(500).send("Error downloading an article");
        Article.create({title: result.title, content: result.content}, (err, article) => {
            if (err) return next(err);
            res.send(article);
        })
    })
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    })
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({message: "deleted"});
    })
});

app.listen(port, () => console.log(`Express web app available at localhost:${port}`));