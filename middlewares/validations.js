const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequest = require('../errors/BadRequest');

const valUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Некорректный URL');
};

const valLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const valCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(valUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const valUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const valUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(valUrl),
  }),
});

const valUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const valCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(valUrl),
  }),
});

const valCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  valLogin,
  valCreateUser,
  valUpdateUser,
  valUpdateAvatar,
  valUserId,
  valCreateCard,
  valCardId,
};
