const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ProduitSchema = mongoose.Schema({
    Nomproduit: {type: String, default: 0},
    Type_produit: {type: String, default: 0},
    Description: { type: String, default: 0 },
    Prix: { type: Number,  default: 0},
    Stock: { type: Number, default: 0 },
    Quantité_Ptoduit: { type: Number},
    Type_produit: {type: String, default: 0}
});
ProduitSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('produit', ProduitSchema);