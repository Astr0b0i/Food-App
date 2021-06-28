const { Router } = require('express');
const typesController = require('../controllers/types');
const router = Router();

router.get('/', typesController.getAllDiets);

module.exports = router;