const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  favoriteId: { type: String },
  productId: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  ],
});

const FavoriteProduct = mongoose.model("FavoriteProduct", FavoriteSchema);

module.exports = { FavoriteProduct };
