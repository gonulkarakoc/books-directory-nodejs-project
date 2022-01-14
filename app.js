const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
// MongoDB connection
mongoose.connect('mongodb://localhost/book-directory')

app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const IndexRouter = require('./route/index.js');
const BooksRouter = require('./route/books.js');

app.use('/',IndexRouter);
app.use('/books', BooksRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
