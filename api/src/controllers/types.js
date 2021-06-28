const { Diet } = require('../db');

class typesModel{
    constructor(model){
        this.model = model;
    }

    getAllDiets = async (req, res) => {
        try{
            const myDiets = await Diet.findAll({
                attributes: ['name']
            });
            res.send(myDiets);
        }catch(err){
            res.status(404);
        }

    }

}

const typesController = new typesModel(Diet);

module.exports = typesController;