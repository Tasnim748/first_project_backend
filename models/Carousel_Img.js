const { Schema, model } = require('mongoose');

const ImageSchema = Schema({
    title: String,
    description: String,
    url: String,
    company: String
});

module.exports.Image = model('Image', ImageSchema);