const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { Op } = require('sequelize');
const { API_KEY} = process.env;

const apiRecipes = async () => {
    console.log('se llamo a las recipes...');
    let arr = [];
    for (let offset = 0; offset<= 80; offset = offset + 10 ){
        try{
            const apiRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&addRecipeInformation=true&apiKey=${API_KEY}`);
            const apiRecipesFormat = apiRecipes.data.results.map(recipe => {
                return {
                    id: recipe.id,
                    title: recipe.title,
                    diets: recipe.diets,
                    image: recipe.image,
                    summary: recipe.summary,
                    spoonacularScore: recipe.spoonacularScore
                }
            })
            arr.push(apiRecipesFormat)
        }catch(err){
            console.log('problemas con la iteracion ' + offset);
        }    
    }
    // arr = array de [[{}]*10]
    const arrReturn = []; 
    arr.forEach(array => {
        array.forEach(recipe =>{
            arrReturn.push(recipe);
        })
    })
    return arrReturn;
}

const recipes100 = apiRecipes();

class recipesModel {
    constructor(model){
        this.model = model;
    }

    getAllRecipes = async (req, res) => {
        try {
            //consulta a la base de datos
            const myRecipes = await this.model.findAll({
                                // as 
                attributes: ['id', ['name','title'], 'dishSummary', 'score', 'healthyFoodLevel', 'stepByStep'],
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });
            //consulta a la api
            const recipes = await recipes100;
            const response = myRecipes.concat(recipes);
            if (response.length === 0) return res.status(404).send('No se encontraron recetas.');
            res.send(response);
        } catch(err){
            console.log(err);
            res.status(404).send(err);
        }
    };

    

    getNameQuery = async (req, res) => {
        const name = req.query.name;
        if (!name) return res.status(404).send('Error, no se paso la consulta');
        try {
            //consulta a la base de datos
            const myRecipes = await this.model.findAll({
                attributes: ['id', 
                    ['name','title'], 
                    'dishSummary', 
                    'score', 
                    'healthyFoodLevel', 
                    'stepByStep'],
                where: {
                    name: {
                        [Op.like] : `%${name}%`,
                    },
                },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            });

            //consulta a la api
            const recipes = await recipes100;
            const recipesFilter = recipes.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));

            const response = myRecipes.concat(recipesFilter);
            if (response.length === 0) return res.status(404).send('No se pudieron encontrar recetas con '+ name);
            res.send(response);
        } catch(err){
            res.status(404).send(err);
        }
    };

    getIdRecipe = async (req, res) => {
        const id = req.params.id;
        if(!id) return res.status(404).send('error, no se paso el id.');
        try {
            if (id.includes('-')){
                const myRecipe = await this.model.findByPk(id, {
                    attributes : [['name','title'], 
                        ['dishSummary', 'summary'], 
                        ['score', 'spoonacularScore'], 
                        ['healthyFoodLevel', 'healthScore'], 
                        ['stepByStep', 'instructions']], 
                    include: {
                        model: Diet,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                });
                res.send(myRecipe);
            } else {
                const apiRecipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
                const { image, title, dishTypes, diets, summary, spoonacularScore, healthScore, instructions } = apiRecipe.data;
                const respondsObject = {
                    image,
                    title,
                    dishTypes,
                    diets,
                    summary,
                    spoonacularScore,
                    healthScore,
                    instructions
                }
                res.send(respondsObject);
            }
        }catch (err){
            res.status(404).send('Error, el id no pertenece a ninguna receta.');
        }
        
    }
}

const recipesController = new recipesModel (Recipe);

module.exports = recipesController;