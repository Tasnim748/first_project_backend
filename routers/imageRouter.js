const express = require('express');
const { Image } = require('../models/Carousel_Img');
const router = express.Router();

const getImages = async (req, res) => {
    const images = await Image.find({});
    return res.send(images);
}

const newImage = async (req, res) => {
    const newImg = new Image(req.body);
    await newImg.save();
    res.send('success');
}

router.route('/')
    .get(getImages)
    .post(newImage)

module.exports = router;
