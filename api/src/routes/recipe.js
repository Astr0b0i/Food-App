const { Router } = require('express');
const recipeController = require('../controllers/recipe');
const router = Router();

router.post('/', recipeController.createRecipe);

module.exports = router;