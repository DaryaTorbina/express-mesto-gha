const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../model/card');

const getCards = async (req, res, next) => {
  try {
    const allCards = await Card.find({});
    res.status(200).send(allCards);
  } catch (err) {
    next(err);
  }
};
// 13. 6/10, 201
const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Некорректные данные карточки'));
    }
    next(err);
  }
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      return card
        .remove()
        .then(() => res
          .status(200)
          .send({ data: card, message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFound('Карточка не найдена'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Передан несуществующий _id карточки');
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для постановки лайка'),
        );
      }
      if (err.message === 'NotFound') {
        next(new NotFound('Передан несуществующий _id карточки'));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Передан несуществующий _id карточки');
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные для снятия лайка'));
      }
      if (err.message === 'NotFound') {
        next(new NotFound('Передан несуществующий _id карточки'));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
