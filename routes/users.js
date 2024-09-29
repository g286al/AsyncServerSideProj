// Gal Natan 205890569
// Eliran Kotzero 316040120
// Mattan Ben Yosef 318360351

var express = require('express');
var router = express.Router();
const schemas = require('../models/schema');
const User = schemas.users

/* GET users listing. */
router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  console.log(`Searching for user with ID: ${userId}`);

  try {
      const user = await User.findOne({ id: userId });
      if (user) {
          console.log('User found:', user);
          res.status(200).json(user);
      } else {
          console.log('User not found');
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Error finding user', error });
  }
});



module.exports = router;
