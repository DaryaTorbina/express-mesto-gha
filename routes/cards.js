const router = require('express').Router();

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

router.get('/', getCards); // возвращает все карточки
router.post('/', valCreateCard, createCard); // создаёт карточку
router.delete('/:cardId', valCardId, deleteCard); // даляет карточку по идентификатору
router.put('/:cardId/likes', valCardId, likeCard); // поставить лайк карточке
router.delete('/:cardId/likes', valCardId, dislikeCard); // убрать лайк с карточки

module.exports = router;
