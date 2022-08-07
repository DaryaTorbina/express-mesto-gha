const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/carsd');

cardsRouter.get('/cards', getCards); // возвращает все карточки
cardsRouter.post('/cards', createCard); // создаёт карточку
cardsRouter.delete('/cards/:cardId', deleteCard); // даляет карточку по идентификатору
cardsRouter.put('/cards/:cardId/likes', likeCard); // поставить лайк карточке
cardsRouter.delete('/cards/:cardId/likes', dislikeCard); // убрать лайк с карточки

module.exports = cardsRouter;
