const { FavoriteProduct } = require("../models/favorites.models.js");

const getFavoriteProducts = async (req, res) => {
  try {
    const query = req.query;
    const favoriteProduct = await FavoriteProduct.find({ ...query });
    res.send(favoriteProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const favoriteProduct = await FavoriteProduct.find({ userId: req.user.id }).populate({
      path: "productId"
    });
    res.send(favoriteProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};


const addFavoritesProducts = async (req, res) => {
  const { productId } = req.params;

  if (!productId) return res.status(400).send({ message: "productId required." });
  try {
    const favorite = await FavoriteProduct.findOne({ userId: req.user.id });
    if (favorite && favorite.productId && favorite.productId.includes(productId)) {
      const updatedFavorites = await FavoriteProduct.findOneAndUpdate(
        { userId: req.user.id },
        { $pull: { productId: productId } }, 
        { new: true }
      );
      res.status(200).send({ updatedFavorites });
    } else {
      const updatedFavorites = await FavoriteProduct.findOneAndUpdate(
        { userId: req.user.id },
        { $addToSet: { productId: productId } }, 
        { new: true, upsert: true }
      );
      res.status(200).send({ updatedFavorites });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const updateFavoriteProduct = async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const favoriteProduct = await FavoriteProduct.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.send(favoriteProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const deleteFavoritesProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const favoriteProduct = await FavoriteProduct.findOne({userId: req.user.id})
    const isUpdated = await FavoriteProduct.findOneAndUpdate(
        favoriteProduct ,
      { $pull: { productId: id } },
      { new: true }
    );
    if (isUpdated) {
      return res.send({ message: "Deleted Successfully" });
    }
    return res.status(404).send("Not Found");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};


module.exports = {
    getFavoriteProducts,
    getUserFavorites,
    addFavoritesProducts,
    updateFavoriteProduct,
    deleteFavoritesProduct,
};
