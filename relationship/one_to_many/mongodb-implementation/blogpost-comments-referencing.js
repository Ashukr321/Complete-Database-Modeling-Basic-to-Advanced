// Use Case: One blog post can have many comments.
// Approach: Referencing (Recommended for potentially large lists)

const mongoose = require('mongoose');

// BlogPost Schema
const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: String
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Comment Schema
const commentSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BlogPost', 
        required: true 
    },
    userName: String,
    commentText: String,
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

/**
 * Why Referencing?
 * If a blog post goes viral, it could have thousands of comments.
 * Storing them as an array inside the BlogPost document (embedding) 
 * could exceed the 16MB BSON limit and slow down queries.
 */

async function getPostWithComments(postId) {
    const post = await BlogPost.findById(postId);
    const comments = await Comment.find({ postId: postId });
    return { post, comments };
}

module.exports = { BlogPost, Comment };
