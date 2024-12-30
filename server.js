const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

const express = require('express');
const app = express();
require('./mongoose_connection');

const booksRouter = require('./routes/books');

app.use('/books', booksRouter);

app.listen(PORT);
