const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    image_main: { type: String, required: true },
    image_description: { type: String, required: true },
    text: { type: String, required: false }
});

module.exports = mongoose.model('Banner', bannerSchema);