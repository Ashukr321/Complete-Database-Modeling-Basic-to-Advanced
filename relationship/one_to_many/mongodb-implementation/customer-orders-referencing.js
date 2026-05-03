// Use Case: One customer can have many orders.
// Approach: Referencing (Standard 1:N)

const mongoose = require('mongoose');

// Customer Schema (Parent - The "One")
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const Customer = mongoose.model('Customer', customerSchema);

// Order Schema (Child - The "Many")
const orderSchema = new mongoose.Schema({
    orderDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    // Reference back to Customer
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    }
});

const Order = mongoose.model('Order', orderSchema);

/**
 * CRUD Operations & Population
 */

async function manageOrders() {
    // 1. Create a Customer
    const customer = await Customer.create({ 
        name: "John Doe", 
        email: "john@example.com" 
    });

    // 2. Create multiple Orders for the same Customer
    await Order.create([
        { amount: 500, customer: customer._id },
        { amount: 300, customer: customer._id }
    ]);

    // 3. Read Orders with Customer Details (.populate)
    // .populate("customer") replaces the ObjectId with the actual Customer document
    const orders = await Order.find({ customer: customer._id }).populate("customer");
    console.log(orders);
}

module.exports = { Customer, Order };
