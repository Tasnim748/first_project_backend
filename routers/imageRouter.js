const express = require('express');
const { Image } = require('../models/Carousel_Img');
const router = express.Router();

const getImages = async (req, res) => {
    if (req.params.company) {
        const images = await Image.find({company: req.params.company});
        return res.status(200).send(images);
    }
    const images = await Image.find({});
    return res.send(images);
}

const newImage = async (req, res) => {
    const newImg = new Image(req.body);
    await newImg.save();
    return res.status(201).send('success');
}

const deleteImage = async (req, res) => {
    console.log(req.body._id);
    try {
        await Image.findByIdAndDelete(req.body._id);
        console.log('deleted', req.body._id);
        return res.status(204).send('deletion successful');
    } catch(e) {
        console.log('some wrong')
        return res.send('deletion error!');
    } 
}

router.route('/:company')
    .get(getImages)

router.route('/')
    .get(getImages)
    .post(newImage)
    .delete(deleteImage)

module.exports = router;
