const {
  ERROR_CODE_REQUEST,
  ERROR_CODE_NOTFOUND,
  ERROR_CODE_DEFAULT,
} = require('../constants');

const Card = require('../model/card');

const getCards = async (req, res) => {
  try {
    const allCards = await Card.find({});
    res.status(200).send(allCards);
  } catch (err) {
    res
      .status(ERROR_CODE_DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};
// 13. 6/10, 201
const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res
        .status(ERROR_CODE_REQUEST)
        .send({
          message: 'Переданы некорректные данные при создании карточки',
        });
    }
    res
      .status(ERROR_CODE_DEFAULT)
      .send({ message: 'На сервере произошла ошибка' });
  }
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании карточки',
          });
      } else {
        res
          .status(ERROR_CODE_DEFAULT)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании карточки',
          });
      } else {
        res
          .status(ERROR_CODE_DEFAULT)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res
          .status(ERROR_CODE_NOTFOUND)
          .send({ message: 'Карточка не найдена' });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE_REQUEST)
          .send({
            message: 'Переданы некорректные данные при создании карточки',
          });
      } else {
        res
          .status(ERROR_CODE_DEFAULT)
          .send({ message: 'Произошла ошибка сервера' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
