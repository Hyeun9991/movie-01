const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================
//            Favorite
//=================================

// favorite 개수 데이터
router.post('/favoriteNumber', async (req, res) => {
  try {
    const favoriteNumber = await Favorite.find({
      movieId: req.body.movieId,
    }).exec();

    res
      .status(200)
      .json({ success: true, favoriteNumber: favoriteNumber.length });
  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
