// Gal Natan 205890569
// Eliran Kotzero 316040120
// Mattan Ben Yosef 318360351

var express = require('express');
var router = express.Router();
const generateRandomId = require('../utils'); // Assuming utils.js generates unique IDs
const schemas = require('../models/schema');
const Calorie = schemas.calories
const User = schemas.users

/* Get a specific user's monthly report */    
router.get('/', async (req, res) => {
const { user_id, year, month } = req.query;

    // Validate query parameters
    if (!user_id || !year || !month) {
        return res.status(400).json({ error: 'Missing query parameters: user_id, year, or month' });
    }

    const userId = parseInt(user_id);
    const reportYear = parseInt(year);
    const reportMonth = parseInt(month);

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ id: userId });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch calories for the given month and year
        const calories = await Calorie.find({ user_id: userId, year: reportYear, month: reportMonth });

        // Prepare the report by categorizing the calories
        const report = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: []
        };

        calories.forEach(calorie => {
            const { category, day, description, amount } = calorie;
            if (report.hasOwnProperty(category)) {
                report[category].push({ day, description, amount });
            } else {
                report.other.push({ day, description, amount });
            }
        });

        // Return the generated report
        res.status(200).json(report);
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ error: "Failed to generate the calorie report", details: error.message });
    }
});

module.exports = router;
