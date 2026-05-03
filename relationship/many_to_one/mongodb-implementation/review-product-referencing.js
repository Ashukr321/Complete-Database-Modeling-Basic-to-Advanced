// Use Case: Many reviews belong to one product (Many-to-One perspective).
// Focus: The Review document stores the Product reference.

const mongoose = require('mongoose');

// Product Schema (The "One")
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Product = mongoose.model('Product', productSchema);

// Review Schema (The "Many")
const reviewSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    // Reference on the "Many" side pointing to the Parent
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    user: String
});

const Review = mongoose.model('Review', reviewSchema);

/**
 * Perspective Query: Many-to-One
 * Goal: Get the Product details for a specific Review.
 */
async function getReviewWithProduct(reviewId) {
    // .populate("product") fetches the single parent for this specific child
    const review = await Review.findById(reviewId).populate("product");
    console.log(`Review for product: ${review.product.name}`);
    return review;
}

module.exports = { Product, Review };
