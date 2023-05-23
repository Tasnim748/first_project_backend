const express = require('express');
const { Image } = require('../models/Carousel_Img');
const router = express.Router();
const DeleteFile = require('./fileDelete');

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
        console.log('deleted');
        const url = req.body.url
        const filename = url.substring(url.lastIndexOf('/') + 1);
        console.log(filename);
        DeleteFile(filename, res)
        return res.status(204).send('deletion successful');
    } catch(e) {
        console.log('some wrong')
        return res.status(500).send('deletion error!');
    }
}

const updateImage = async (req, res) => {
    console.log(req.body, req.body.url, req.body._id);
    if (req.body.oldUrl) {
        const url = req.body.oldUrl;
        const filename = url.substring(url.lastIndexOf('/') + 1);
        DeleteFile(filename, res);
        // console.log('oldurl', req.body.oldUrl);
    }
    await Image.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        projectType: req.body.projectType
    })
    return res.status(204).send('updated!');
}

router.route('/:company')
    .get(getImages)

router.route('/')
    .get(getImages)
    .post(newImage)
    .delete(deleteImage)
    .put(updateImage);

module.exports = router;
