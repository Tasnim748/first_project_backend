const express = require('express');
const { Company } = require('../models/Company');
const router = express.Router();

const getCompanies = async (req, res) => {
    if (req.params.id) {
        const company = await Company.findById(req.params.id);
        return res.status(200).send(company);
    }
    const company = await Company.find({});
    return res.status(200).send(company);
}

const newCompany = async (req, res) => {
    const newImg = new Company(req.body);
    await newImg.save();
    res.send('success');
}

router.route('/:id')
    .get(getCompanies)

router.route('/')
    .get(getCompanies)
    .post(newCompany)

module.exports = router;
