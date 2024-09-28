// Gal Natan 205890569
// Eliran Kotzero 316040120
// Mattan Ben Yosef 318360351

var express = require('express');
var router = express.Router();
const generateRandomId = require('../utils'); // Assuming utils.js generates unique IDs
const schemas = require('../models/schema');
const Calorie = schemas.calories;
const User = schemas.users;

router.get('/', (req, res) => {
    res.render('addcalories'); // Renders the HTML form (Pug template)
});

/* POST add calories */
router.post('/', async (req, res) => {
    let { user_id, year, month, day, description, category, amount } = req.body;
    
    // Check if the request is coming as JSON or form-data
    if (req.is('application/json')) {
        console.log('Received JSON data');
    } else if (req.is('application/x-www-form-urlencoded') || req.is('multipart/form-data')) {
        console.log('Received form data');
    } else {
        return res.status(400).json({ error: 'Unsupported content-type' });
    }

    // Convert numeric parameters to numbers
    const parsedUserId = parseInt(user_id, 10);
    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedDay = parseInt(day, 10);
    const parsedAmount = parseFloat(amount);

    console.log('Parsed data:', { parsedUserId, parsedYear, parsedMonth, parsedDay, description, category, parsedAmount });

    // Check if the user exists in the database
    try {
        const existingUser = await User.findOne({ id: parsedUserId });
        if (!existingUser) {
            console.log(`User with id ${parsedUserId} not found`);
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new calorie document
        const newCalorie = new Calorie({
            user_id: parsedUserId,
            year: parsedYear,
            month: parsedMonth,
            day: parsedDay,
            id: generateRandomId(),
            description,
            category,
            amount: parsedAmount,
        });

        // Validate the calorie document against the schema
        const validationError = newCalorie.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            console.log('Validation errors:', errorMessages);
            return res.status(400).json({ errors: errorMessages });
        }

        // Save the calorie entry to the database
        const savedCalorie = await newCalorie.save();
        console.log('Saved calorie:', savedCalorie);
        res.status(201).json(savedCalorie);
    } catch (error) {
        console.error('Error adding calorie:', error);
        res.status(500).json({ error: 'Failed to add the calorie consumption item', details: error.toString() });
    }
});

module.exports = router;
