const express = require('express');
const listingsRouter = express.Router();
const Listing = require('../models/listingModel');

listingsRouter.get('/:gender_slug', async (req, res) => {
    //get gender for metadata
    const gender = await Listing.findOne({ gender_slug: req.params.gender_slug });
    //get listings broken down by category for html
    const tops = await Listing.find({ gender_slug: req.params.gender_slug, category: 'Tops' }).sort({ name: 'ascending' });
    const shirts = await Listing.find({ gender_slug: req.params.gender_slug, category: 'Shirts' }).sort({ name: 'ascending' });
    const jackets = await Listing.find({ gender_slug: req.params.gender_slug, category: 'Jackets' }).sort({ name: 'ascending' });
    const skirts = await Listing.find({ gender_slug: req.params.gender_slug, category: 'Skirts' }).sort({ name: 'ascending' });
    const pants = await Listing.find({ gender_slug: req.params.gender_slug, category: 'Pants' }).sort({ name: 'ascending' });
    const shoes = await Listing.find({ gender_slug: req.params.gender_slug, category: 'Shoes' }).sort({ name: 'ascending' });
    const socks = await Listing.find({ gender_slug: req.params.gender_slug, category: 'Socks' }).sort({ name: 'ascending' });
    res.render('store/listings', {
        //listings
        tops: tops,
        shirts: shirts,
        jackets: jackets,
        skirts: skirts,
        pants: pants,
        shoes: shoes,
        socks: socks,
        //metadata
        meta_title: `${gender.gender} Clothing`,
        meta_description: `Browse ${gender.gender} clothing broken down by category.`,
        meta_image: 'woman-sunglasses.webp',
        meta_url: `/listings/${gender.gender_slug}`,
        //css
        css: '<link rel="stylesheet" href="/css/listings.css">',
        //script
        script: '<script type="module" src="/scripts/store/listings.js" defer></script>'
    });
});

module.exports = listingsRouter;