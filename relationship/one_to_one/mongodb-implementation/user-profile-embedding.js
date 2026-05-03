// Use Case: Embedding profile data inside the user document.
// Best for: When profile data is small, frequently accessed with the user, and always present.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    // Embedded Profile Document (1:1)
    profile: {
        bio: String,
        avatarUrl: String,
        dob: Date,
        website: String
    },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
