const User = require('../model/user');
const { ERROR_CODE_REQUEST, ERROR_CODE_NOTFOUND, ERROR_CODE_DEFAULT } = require('../constants');

const getUser = (req, res) => {
  User.findById(req.params.userId)// найти конкретного
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь не найден,переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Пользователь по данному id не найден' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});// найти всех
    res.status(200).send(allUsers);
  } catch (err) {
    res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(201).send(user);
  } catch (err) { // // данные не записались, вернём ошибку
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_REQUEST).send({ message: 'Пользователь по данному id не найден' });
    }
    res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
  }
};

const updateUser = (req, res) => {
  const { name, about } = req.body; // получим из объекта запроса имя и описание пользователя
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь не найден,переданы некорректные данные' });
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Пользователь по данному id не найден' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь не найден' });
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Некорректные данные пользователя' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка сервера' });
      }
    });
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
