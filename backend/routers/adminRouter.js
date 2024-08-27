const express = require('express');
const { body, validationResult } = require('express-validator');
const adminRouter = express.Router();
const Listing = require('../models/listingModel');
const Banner = require('../models/bannerModel');
const { isAuth, isAdmin } = require('../utils');

//GET PAGES

//admin dashboard
adminRouter.get('/dashboard', async (req, res) => {
    res.render('admin/dashboard', {
        //metadata
        meta_title: 'Admin Dashboard',
        meta_description: 'View and change your admin user information',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '/users/admin'
    });
});

//listing-list
adminRouter.get('/listings-list', async (req, res) => {
    const mListings = await Listing.find({ gender: 'Men\'s' }).sort({
        createdAt: 'descending'
    });
    const wListings = await Listing.find({ gender: 'Women\'s' }).sort({
        createdAt: 'descending'
    });
    const uListings = await Listing.find({ gender: 'Unisex' }).sort({
        createdAt: 'descending'
    });
    res.render('admin/listings-list', {
        //metadata
        meta_title: 'Listing List',
        //listings
        mListings: mListings,
        wListings: wListings,
        uListings: uListings
    });
});

//listing-edit
adminRouter.get('/listing/edit/:id', async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render('admin/listing-edit', {
        //metadata
        meta_title: 'Edit listing',
        //listing
        listing: listing
    });
});

//banner-list
adminRouter.get('/banners-list', async (req, res) => {
    const banner = await Banner.findOne();
    res.render('admin/banners-list', {
        //metadata
        meta_title: 'Banners List',
        //banner
        banner: banner
    });
});

//banner-edit
adminRouter.get('/banner/edit/:id', async (req,res) => {
    const banner = await Banner.findById(req.params.id);
    res.render('admin/banner-edit', {
        //metadata
        meta_title: 'Edit Banner',
        //banner
        banner: banner
    })
});


//POST

//create new listing
adminRouter.post('/listing-list', [
    //sanitize post data
    body('name').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape(),
    body('gender').notEmpty().trim(),
    body('category').notEmpty().trim().escape(),
    body('type').notEmpty().trim().escape(),
    body('image_main').notEmpty().trim().escape(),
    body('image_1').trim().escape(),
    body('image_2').trim().escape(),
    body('image_3').trim().escape(),
    body('image_4').trim().escape(),
    body('price').notEmpty().trim().escape(),
    body('count_in_stock').notEmpty().trim().escape()
], isAuth, isAdmin, async (req, res) => {
    //validate data
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Please fill in all required fields'
        });
    }
    //save listing
    const listing = new Listing({
        name: req.body.name,
        description: req.body.description,
        gender: req.body.gender,
        category: req.body.category,
        type: req.body.type,
        image_main: req.body.image_main,
        image_1: req.body.image_1,
        image_2: req.body.image_2,
        image_3: req.body.image_3,
        image_4: req.body.image_4,
        price: req.body.price,
        count_in_stock: req.body.count_in_stock,
    });
    const createdListing = await listing.save();
    if(!createdListing) {
        res.status(500).send({ message: 'Error in creating listing, please try again'});
    }else {
        res.status(201).send({
            _id: createdListing._id,
            name: createdListing.name,
            description: createdListing.description,
            gender: createdListing.gender,
            category: createdListing.category,
            type: createdListing.type,
            image_main: createdListing.image_main,
            image_1: createdListing.image_1,
            image_2: createdListing.image_2,
            image_3: createdListing.image_3,
            image_4: createdListing.image_4,
            price: createdListing.price,
            count_in_stock: createdListing.count_in_stock,
        });
    }
});

//create new banner
adminRouter.post('/banner-list', [
    //sanitize post data
    body('image_main').notEmpty().trim().escape(),
    body('image_description').notEmpty().trim().escape(),
    body('text').trim().escape()
], isAuth, isAdmin, async (req, res) => {
    //validate data
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Please fill in all required fields'
        });
    }
    //save banner
    const banner = new Banner({
        image_main: req.body.image_main,
        image_description: req.body.image_description,
        text: req.body.text
    });
    const createdBanner = await banner.save();
    if(!createdBanner) {
        res.status(500).send({ message: 'Error in creating banner, please try again' });
    }else {
        res.status(201).send({
            _id: createdBanner._id,
            image_main: createdBanner.image_main,
            image_description: createdBanner.image_description,
            text: createdBanner.text
        });
    }
});


//PUT

//edit listing
adminRouter.put('/listing/edit/:id', [
    //sanitize put data
    body('name').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape(),
    body('gender').notEmpty().trim(),
    body('category').notEmpty().trim().escape(),
    body('type').notEmpty().trim().escape(),
    body('image_main').notEmpty().trim().escape(),
    body('image_1').trim().escape(),
    body('image_2').trim().escape(),
    body('image_3').trim().escape(),
    body('image_4').trim().escape(),
    body('price').notEmpty().trim().escape(),
    body('count_in_stock').notEmpty().trim().escape()
], isAuth, isAdmin, async (req, res) => {
    //validate data
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Please fill in all required fields'
        });
    }
    //save listing
    const listingId = req.params.id;
    const listing = await Listing.findByIdAndUpdate(listingId);
    if(listing) {
        listing.name = req.body.name,
        listing.description = req.body.description,
        listing.gender = req.body.gender,
        listing.category = req.body.category,
        listing.type = req.body.type,
        listing.image_main = req.body.image_main,
        listing.image_1 = req.body.image_1,
        listing.image_2 = req.body.image_2,
        listing.image_3 = req.body.image_3,
        listing.image_4 = req.body.image_4,
        listing.price = req.body.price,
        listing.count_in_stock = req.body.count_in_stock
        const updatedListing = await listing.save();
        if(updatedListing) {
            res.status(200).send({
                message: 'listing Updated', listing: updatedListing
            });
        }else {
            res.status(500).send({ message: 'Error, please try again' });
        }
    }else {
        res.status(404).send({ message: 'listing Not Found' });
    }
});

//edit banner
adminRouter.put('/banner/edit/:id', [
    //sanitize put data
    body('image_main').notEmpty().trim().escape(),
    body('image_description').notEmpty().trim().escape(),
    body('text').trim().escape()
], isAuth, isAdmin, async (req, res) => {
    //validate data
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Please fill in all required fields'
        });
    }
    //save banner
    const bannerId = req.params.id;
    const banner = await Banner.findByIdAndUpdate(bannerId);
    if(banner) {
        banner.image_main = req.body.image_main,
        banner.image_description = req.body.image_description,
        banner.text = req.body.text
        const updatedBanner = await banner.save();
        if(updatedBanner) {
            res.status(200).send({
                message: 'Banner Updated', banner: updatedBanner
            });
        }else {
            res.status(500).send({ message: 'Error, please try again' });
        }
    }else {
        res.status(404).send({ message: 'Banner Not Found' });
    }
});


//DELETE

//delete listing
adminRouter.delete('/listing/edit/:id', isAuth, isAdmin, async (req, res) => {
    const listing = await listing.findByIdAndDelete(req.params.id);
    if(listing) {
        res.status(200).send({ message: 'listing Deleted' });
    }else {
        res.status(404).send({ message: 'listing Not Found' });
    }
});

module.exports = adminRouter;