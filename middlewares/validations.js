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
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(
        /^((http|https):\/\/)?(www\.)?([a-zа-я0-9]{1}[a-zа-я0-9-\\]*\.?)*\.{1}[a-zа-я0-9-]{2,8}(\w-\.~:\/?#\[\]@!$&'\(\)*\+,;=)?/i,
      ),
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
    avatar: Joi.string().required()
      .regex(
        /^((http|https):\/\/)?(www\.)?([a-zа-я0-9]{1}[a-zа-я0-9-\\]*\.?)*\.{1}[a-zа-я0-9-]{2,8}(\w-\.~:\/?#\[\]@!$&'\(\)*\+,;=)?/i,
      ),
  }),
});

const valUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const valCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .regex(
        /^((http|https):\/\/)?(www\.)?([a-zа-я0-9]{1}[a-zа-я0-9-\\]*\.?)*\.{1}[a-zа-я0-9-]{2,8}(\w-\.~:\/?#\[\]@!$&'\(\)*\+,;=)?/i,
      ),
  }),
});

const valCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  valUrl,
  valLogin,
  valCreateUser,
  valUpdateUser,
  valUpdateAvatar,
  valUserId,
  valCreateCard,
  valCardId,
};
