const produitRouter = require('./rooms.js');

module.exports = (app) => {
  app.use('/produits', produitRouter);
};
