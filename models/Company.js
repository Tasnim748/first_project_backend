const { Schema, model } = require('mongoose');

const CompanySchema = Schema({
    title: String,
    url: String
});

module.exports.Company = model('Company', CompanySchema);