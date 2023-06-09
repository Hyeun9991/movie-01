const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================
//            Favorite
//=================================

// 영화의 favorite 개수 데이터
router.post('/favoriteNumber', async (req, res) => {
  try {
    const favoriteNumber = await Favorite.find({
      movieId: req.body.movieId,
    }).exec();

    return res
      .status(200)
      .json({ success: true, favoriteNumber: favoriteNumber.length });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// 유저가 영화를 favorite 리스트에 넣었는지 정보를 DB에서 가져오기
router.post('/favored', async (req, res) => {
  try {
    const favored = await Favorite.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec();

    let isFavored = false;

    if (favored.length !== 0) {
      isFavored = true;
    }

    return res.status(200).json({ success: true, favored: isFavored });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// favorite 추가 -  client에서 전달받은 favorite body를 Favorite Model에 저장
router.post('/addToFavorite', async (req, res) => {
  try {
    const favorite = new Favorite(req.body);

    await favorite.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// favorite 삭제 - Favorite Model에서 body에 해당하는 데이터를 찾고 제거
router.post('/removeFromFavorite', async (req, res) => {
  try {
    const removeFavorite = await Favorite.findOneAndDelete({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec();

    return res.status(200).json({ success: true, removeFavorite });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// 좋아요 누른 영화 정보들
router.post('/getFavoredMovie', async (req, res) => {
  try {
    const favorites = await Favorite.find({
      userFrom: req.body.userFrom,
    }).exec();

    return res.status(200).json({ success: true, favorites });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// 좋아요 페이지에서 삭제버튼 눌렀을때
router.post('/removeFromFavorite', async (req, res) => {
  try {
    const removeFavorite = await Favorite.findOneAndDelete({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec();

    return res.status(200).json({ success: true, removeFavorite });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
