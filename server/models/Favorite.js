const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      // 유저의 아이디를 이용해서 유저의 모든 정보를 가져올 수 있다.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite };
