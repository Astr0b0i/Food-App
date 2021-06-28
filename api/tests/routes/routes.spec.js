/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const { v4: uuidv4 } = require('uuid');
const recipe = {
  name: 'Milanea a la napolitana',
  dishSummary: 'descripcion de la milanesa a la napolitana',
  id:uuidv4()
};


describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes/all').expect(200)
    );

    it('GET /recipes?name=c', () =>{
      agent.get('/recipes?name=c').expect(200)
    });
  });

  describe('GET /types', () => {
    it('should post 200', () => {
     agent.get('/types').expect(200);
    });

  });
});
