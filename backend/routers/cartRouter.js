const express = require('express');
const cartRouter = express.Router();

//get cart page
cartRouter.get('/', async (req, res) => {
    res.render('store/cart', {
        //metadata
        meta_title: 'Cart',
        meta_description: 'View your items in one convenient place.',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '',
        //css
        css: '<link rel="stylesheet" href="/css/cart.css">',
        //script
        script: ''
    });
});

module.exports = cartRouter;