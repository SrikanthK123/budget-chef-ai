const express = require('express');
const router = express.Router();
const { generateMeal } = require('../controllers/mealController');

router.post('/generate-meal', generateMeal);

module.exports = router;
