const mongoose = require('mongoose');
const slugify = require('slugify');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },
    comment: { type: String, required: true }},
    { timestamps: true }
);

const listingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    gender_slug: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    image_main : { type: String, required: true },
    image_1: { type: String, required: false },
    image_2: { type: String, required: false },
    image_3: { type: String, required: false },
    image_4: { type: String, required: false },
    price: { type: Number, required: true },
    count_in_stock: { type: Number, default: 0.0, required: true },
    rating: { type: Number, default: 0.0, required: true },
    num_reviews: { type: Number, default: 0.0, required: true },
    reviews: [reviewSchema]},
    { timestamps: true }    
);

listingSchema.pre('validate', function(next) {
    if(this.name) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true
        });
    }
    if(this.gender) {
        this.gender_slug = slugify(this.gender, {
            lower: true,
            strict: true
        });
    }
    next();
});

module.exports = mongoose.model('Listing', listingSchema);