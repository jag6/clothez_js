const mongoose = require('mongoose');
const listingSchema = require('../models/listingModel');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    listings: [listingSchema],
    total: { default: 0, type: Number }},
    { timestamps: true }    
);

module.exports = mongoose.model('Cart', cartSchema);