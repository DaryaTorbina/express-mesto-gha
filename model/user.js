const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный URL адрес',
    },
  },
});
// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
