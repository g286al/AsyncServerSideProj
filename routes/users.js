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

/* Get all users */
// router.get('/', async (req, res) => {
//   try {
//     console.log('Route accessed');
//     const users = await schemas.users.find({}); // Fetch all users from MongoDB
//     if (users.length === 0) {
//       return res.status(404).render('users', { message: 'No users found', users: [] });
//     }
//     res.render('users', { users }); // Pass users to the Pug template
//   } catch (error) {
//     console.error('Error retrieving users:', error);
//     res.status(500).json({ error: 'Failed to retrieve users' });
//   }
// });

module.exports = router;
