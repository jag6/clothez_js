import { getUserInfo } from '../export/cookies.js';
const { first_name } = getUserInfo();

const ratingStars = {
    render: (props) => {
        if(!props.value){
            return '<div></div>';
        }
        return `
            <div class="rating">
                <span>
                    <i class="${props.value >= 1? 'fa-solid fa-star': props.value >= .5? 'fa-solid fa-star-half': 'fa-regular fa-star'}"></i>
                </span>
                <span>
                    <i class="${props.value >= 2? 'fa-solid  fa-star': props.value >= 1.5? 'fa-solid fa-star-half': 'fa-regular fa-star'}"></i>
                </span>
                <span>
                    <i class="${props.value >= 3? 'fa-solid  fa-star': props.value >= 2.5? 'fa-solid fa-star-half': 'fa-regular fa-star'}"></i>
                </span>
                <span>
                    <i class="${props.value >= 4? 'fa-solid  fa-star': props.value >= 3.5? 'fa-solid fa-star-half': 'fa-regular fa-star'}"></i>
                </span>
                <span>
                    <i class="${props.value >= 5? 'fa-solid  fa-star': props.value >= 4.5? 'fa-solid fa-star-half': 'fa-regular fa-star'}"></i>
                </span>
                <span>${props.text || ''}</span>
            </div>
        `;
    },
};

//populate listing rating on both home and listing pages 
const listingRating = document.querySelectorAll('.listing-rating');
listingRating.forEach((rating) => {
    const listing = '<%= listing %>'
    rating.innerHTML = `${ratingStars.render({
        value: `${listing.rating }`, 
        text: `${listing.numReviews === 1 ? `${listing.numReviews} review` : 'No reviews'}`
    })}`
});

//text: `${listing.numReviews === 1 ? `${listing.numReviews} review` : `${listing.numReviews} reviews`}`

//show review box only if logged in
if(document.querySelector('#reviews-container')) {
    const reviewBox = document.getElementById('review-box');
    if(first_name) {
        reviewBox.innerHTML = `
            <form id="review-form" class="form review-form">
                <h2><span><i class="fa-solid fa-pen-to-square"></i></span>Write a Review</h2>
                <label for="rating">Rating</label>
                <select required name="rating" id="rating">
                    <option value="">Select</option>
                    <option value="1">1 = Poor</option>
                    <option value="2">2 = Fair</option>
                    <option value="3">3 = Good</option>
                    <option value="4">4 = Very Good</option>
                    <option value="5">5 = Excellent</option>
                </select>
                <label for="comment">Comment</label>
                <textarea required name="comment" id="comment" cols="30" rows="5"></textarea>
                <button type="submit" class="primary bold">SUBMIT</button>
            </form>
            
        `;
    }else {
        reviewBox.innerHTML = `
            <section class="all-reviews">
                <div>
                    <p>Please Log In <a href="/users/login"><span class="bold">HERE</span></a> to write a review</p>
                </div>    
            </section>
        `;
    }
}

//show customer reviews
if(document.querySelector('.review-rating')) {
    document.querySelector('.review-rating').innerHTML = `
        ${ratingStars.render({
            value: review.rating
        })}
    `;
}