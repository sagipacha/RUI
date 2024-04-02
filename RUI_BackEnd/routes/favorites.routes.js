const { Router } = require("express");
const {
    getFavoriteProducts,
    getUserFavorites,
    addFavoritesProducts,
    updateFavoriteProduct,
    deleteFavoritesProduct,
  } = require("../controllers/favorites.controllers.js")
  const { auth } = require("../middlewares/auth.js");

  const router = Router()

  router.get("/", getFavoriteProducts); 

  router.get("/users", auth,getUserFavorites);  
  router.put("/favoriteProduct/:productId",auth, addFavoritesProducts);
  router.patch("/:id", updateFavoriteProduct);
  router.put("/:id",auth, deleteFavoritesProduct);

module.exports = router;
