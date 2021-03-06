const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require('./config');

const IndexRouter = require('./route/index.js');
const BooksRouter = require('./route/books.js');
const UsersRouter = require('./route/users.js');
const verifyToken = require('./middleware/verify-token.js')
const app = express();
const port = 3000;
// MongoDB connection
mongoose.connect('mongodb://localhost/book-directory')

app.set('api_secret_key',config.api_secret_key);
app.set('view engine','pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',IndexRouter);
app.use('/books', BooksRouter);
app.use('/users', verifyToken);
app.use('/users', UsersRouter);

module.exports = app.listen(port);

