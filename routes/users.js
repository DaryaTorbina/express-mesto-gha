const router = require('express').Router();

const {
  getCurrentUser, getUser, getAllUsers, updateUser, updateUserAvatar,
} = require('../controllers/users');
const {
  valUserId,
  valUpdateUser,
  valUpdateAvatar,
} = require('../middlewares/validations');

// usersRouter.post('/', createUser); // создаёт пользователя
router.get('/me', getCurrentUser);
router.get('/:userId', valUserId, getUser); // возвращает пользователя по _id, динамический роут :
router.get('/', getAllUsers); // возвращает пользователя по _id
router.patch('/me', valUpdateUser, updateUser); // обновляет профиль
router.patch('/me/avatar', valUpdateAvatar, updateUserAvatar); // обновляет аватар

module.exports = router;
