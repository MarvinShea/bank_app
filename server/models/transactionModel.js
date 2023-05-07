const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const transactionModel = mongoose.model('transactions', transactionSchema)
module.exports = transactionModel