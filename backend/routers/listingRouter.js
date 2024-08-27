const express = require('express');
const listingRouter = express.Router();
const Listing = require('../models/listingModel');

//get listing page
listingRouter.get('/:slug', async (req, res) => {
    const listing = await Listing.findOne({ slug: req.params.slug });
    if(listing == null) res.redirect('/');
    res.render('store/listing', { 
        //listing
        listing: listing,
        //css
        css: '<link rel="stylesheet" href="/css/listings.css">',
        //script
        script: ''
     });
});

//add listing to cart
listingRouter.post('/:slug', async (req, res) => {
    const listing = await Listing.findOne({ slug: req.params.slug });
    if(!listing) {
        return res.status(401).send({
            message: 'No Listing Found'
        });
    }else {
        res.status(200).send({
            _id: listing._id,
            name: listing.name,
            slug: listing.slug,
            image_main: listing.image_main,
            price: listing.price,
            count_in_stock: listing.count_in_stock,
            qty: listing.qty
        });
    }
});

module.exports = listingRouter;