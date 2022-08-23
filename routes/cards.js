const cardsRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/carsd');
const {
  valCreateCard,
  valCardId,
} = require('../middlewares/validations');

cardsRouter.get('/cards', getCards); // возвращает все карточки
cardsRouter.post('/cards', createCard); // создаёт карточку
cardsRouter.delete('/cards/:cardId', deleteCard); // даляет карточку по идентификатору
cardsRouter.put('/cards/:cardId/likes', valCreateCard, likeCard); // поставить лайк карточке
cardsRouter.delete('/cards/:cardId/likes', valCardId, dislikeCard); // убрать лайк с карточки

module.exports = cardsRouter;
