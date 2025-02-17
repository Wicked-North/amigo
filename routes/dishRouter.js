const express = require('express');
const dishRouter = express.Router();
const { queryDatabase } = require('../db'); // ✅ Ensure queryDatabase is imported

// ✅ Define the GET route
dishRouter.get('/', async (req, res, next) => {
  try {
    const dishes = await queryDatabase('SELECT * FROM Persons'); // Fetch all dishes
    res.status(200).json({ dishes }); // Test response
  } catch (err) {
    console.error('❌ Error:', err);
    next(err);
  }
});

// ✅ Export the router
module.exports = dishRouter;
