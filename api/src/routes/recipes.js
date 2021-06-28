const { Router } = require('express');
const recipesController = require('../controllers/recipes');
const router = Router();

router.get('/', recipesController.getNameQuery);
router.get('/all', recipesController.getAllRecipes);
router.get('/:id', recipesController.getIdRecipe); 
module.exports = router;