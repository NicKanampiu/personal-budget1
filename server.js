const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Budget = require('./models/budget');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal_budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// GET endpoint - Fetch budget data
app.get('/budget', async (req, res) => {
    try {
        const budgetData = await Budget.find();
        res.json({ myBudget: budgetData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST endpoint - Add new budget data
app.post('/budget', async (req, res) => {
    try {
        const newBudgetItem = new Budget(req.body);
        await newBudgetItem.save();
        res.status(201).json(newBudgetItem);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Personal Budget API running at http://localhost:${port}`);
});

