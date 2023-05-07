const express = require('express');
const { Company } = require('../models/Company');
const router = express.Router();

const getCompanies = async (req, res) => {
    const images = await Company.find({});
    return res.send(images);
}

const newCompany = async (req, res) => {
    const newImg = new Company(req.body);
    await newImg.save();
    res.send('success');
}

router.route('/')
    .get(getCompanies)
    .post(newCompany)

module.exports = router;
