// Use Case: Separating sensitive bank details from general employee info.
// Best for: Security and access control in NoSQL.

const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    position: String,
    hireDate: Date
});

const Employee = mongoose.model('Employee', employeeSchema);

// BankDetails Schema (Stored in a separate collection with restricted access)
const bankDetailsSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        unique: true, 
        required: true 
    },
    accountNumber: { type: String, required: true },
    bankName: String,
    ifscCode: String,
    accountHolderName: String
});

const BankDetails = mongoose.model('BankDetails', bankDetailsSchema);

module.exports = { Employee, BankDetails };
