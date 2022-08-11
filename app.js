const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { ERROR_CODE_NOTFOUND } = require('./utils/constants');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62ed01882305654f537ad0bd',
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);
app.all('*', (req, res) => {
  res.status(ERROR_CODE_NOTFOUND).send({ message: 'Ошибка 404. Страница не найдена!' });
});

app.listen(PORT, () => {});
