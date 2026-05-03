// Use Case: Referencing a profile document from a separate collection.
// Best for: When profile data is optional, large, or updated independently.

const mongoose = require('mongoose');

// User Schema (Parent)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Profile Schema (Dependent)
const profileSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        unique: true, // Ensures 1:1 relationship
        required: true 
    },
    bio: String,
    avatarUrl: String,
    dob: Date,
    website: String
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = { User, Profile };
