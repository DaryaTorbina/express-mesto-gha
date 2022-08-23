const usersRouter = require('express').Router();

const {
  createUser, getUser, getAllUsers, updateUser, updateUserAvatar,
} = require('../controllers/users');
const {
  valUserId,
  valUpdateUser,
  valUpdateAvatar,
} = require('../middlewares/validations');

usersRouter.post('/users', createUser); // создаёт пользователя
usersRouter.get('/users/:userId', valUserId, getUser); // возвращает пользователя по _id, динамический роут :
usersRouter.get('/users', getAllUsers); // возвращает пользователя по _id
usersRouter.patch('/users/me', valUpdateUser, updateUser); // обновляет профиль
usersRouter.patch('/users/me/avatar', valUpdateAvatar, updateUserAvatar); // обновляет аватар

module.exports = usersRouter;
