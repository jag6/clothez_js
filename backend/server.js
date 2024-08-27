const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const methodOverride = require('method-override');
const userRouter = require('./routers/userRouter');
const listingRouter = require('./routers/listingRouter');
const listingsRouter = require('./routers/listingsRouter');
const cartRouter = require('./routers/cartRouter');
const adminRouter = require('./routers/adminRouter');
const uploadRouter = require('./routers/uploadRouter');
const Banner = require('./models/bannerModel');
const Listing = require('./models/listingModel');

//set up mongoose
mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongodb');
}).catch((error) => {
    console.log(error.reason);
});


//set ejs for pages
app.set('view engine', 'ejs');

//configure express to show content
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//allow form to have put and delete methods
app.use(methodOverride('_method'));

//handle errors
app.use((err, req, res, next) => {
    const status = err.name && err.name == 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
});


//set up routers
app.use('/users', userRouter);
app.use('/listing', listingRouter);
app.use('/listings', listingsRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);

//index page
app.get('/', async (req, res) => {
    const banner = await Banner.findOne();
    const mListings = await Listing.find({ gender: 'Men\'s' }).sort({
        createdAt: 'descending'
    });
    const wListings = await Listing.find({ gender: 'Women\'s' }).sort({
        createdAt: 'descending'
    });
    const uListings = await Listing.find({ gender: 'Unisex' }).sort({
        createdAt: 'descending'
    });
    res.render('store/index', {
        //banner
        banner: banner,
        //listings
        mListings: mListings,
        wListings: wListings,
        uListings: uListings,
        //metadata
        meta_title: 'Home',
        meta_description: 'Come and shop at the best online clothes shop around.',
        meta_image: 'woman-sunglasses.webp',
        meta_url: '',
        //css
        css: '',
        //script
        script: '<script type="module" src="/scripts/store/listings.js" defer></script>'
    });
});


//server
app.listen(config.PORT, () => {
    console.log(`listening on http://localhost:${config.PORT}`);
});