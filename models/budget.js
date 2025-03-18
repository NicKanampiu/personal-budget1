// models/budget.js
const mongoose = require('mongoose');
const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-Fa-f]{6}$/
    }
});

module.exports = mongoose.model('Budget', budgetSchema);