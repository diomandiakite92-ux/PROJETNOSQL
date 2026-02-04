const Produit = require('../models/room');

// Créer un nouveau produit
exports.create = (req, res, next) => {
  const produit = new Produit({
    Nomproduit: req.body.Nomproduit,
    Type_produit: req.body.Type_produit,
    Description: req.body.Description,
    Prix: req.body.Prix,
    Stock: req.body.Stock,
    Quantité_Produit: req.body.Quantité_Produit
  });
  produit.save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};