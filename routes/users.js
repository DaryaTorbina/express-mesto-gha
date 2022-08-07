const usersRouter = require('express').Router();

const {
  createUser, getUser, getAllUsers, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.post('/users', createUser); // создаёт пользователя
usersRouter.get('/users/:userId', getUser); // возвращает пользователя по _id, динамический роут :
usersRouter.get('/users', getAllUsers); // возвращает пользователя по _id
usersRouter.patch('/users/me', updateUser); // обновляет профиль
usersRouter.patch('/users/me/avatar', updateUserAvatar); // обновляет аватар

module.exports = usersRouter;
//создать роут