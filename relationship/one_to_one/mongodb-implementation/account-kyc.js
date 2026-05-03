// Use Case: One-to-one relationship between a Financial Account and its KYC verification.
// Best for: Compliance data that is large and processed separately.

const mongoose = require('mongoose');

// Account Schema
const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, unique: true },
    accountType: String,
    balance: Number
});

const Account = mongoose.model('Account', accountSchema);

// KYC Schema
const kycSchema = new mongoose.Schema({
    account: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', 
        unique: true, 
        required: true 
    },
    documentType: { type: String, enum: ['Passport', 'Aadhar', 'Driving License'] },
    documentNumber: String,
    verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
    verifiedAt: Date
});

const KYC = mongoose.model('KYC', kycSchema);

module.exports = { Account, KYC };
