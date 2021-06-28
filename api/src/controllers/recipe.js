const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class recipeModel{
    constructor(model){
        this.model = model;
    }

    createRecipe = async (req, res) => {
        let {name, dishSummary, score, healthyFoodLevel, stepByStep, diets} = req.body;

        if (!name || !dishSummary) return res.status(404).send('No se pasaron los parametros obligatorios.')

        if (dishSummary || stepByStep){
            dishSummary = dishSummary.replace(/[< > \/]/gm,' ');
            stepByStep = stepByStep.replace(/[< > \/]/gm,' ');
        }

        try {
            const createdRecipe = await this.model.create({
                name,
                dishSummary,
                score,
                healthyFoodLevel,
                stepByStep,
                id: uuidv4()
            });

            const dbDiets = await Diet.findAll({
                where: {
                    name : {
                        [Op.in]: Array.isArray(diets) ? diets : [diets]
                    }
                } 
            });

            await createdRecipe.setDiets(dbDiets);
            res.send(createdRecipe);
        } catch(err) {
            res.status(404).send(err);
        }
    }
}

const recipeController = new recipeModel(Recipe);

module.exports = recipeController;