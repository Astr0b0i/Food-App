const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));

    describe('name', () => {
      it('Tira error si el name no es pasado como parametro', (done) => {
        Recipe.create({})
          .then(() => done(new Error('No se pasaron los parametros obligatorios')))
          .catch(() => done());
      });
      it('Tira error si el dishSummary no es pasado como parametro', (done) => {
        Recipe.create({ 
          name: 'Milanesa a la napolitana'})
          .then(() => done(new Error('No se pasaron los parametros obligatorios')))
          .catch(() => done());
      });
    });
  });
});
